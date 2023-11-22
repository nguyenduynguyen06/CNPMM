import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { message, Modal, Space, Table, Upload } from 'antd';
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined,PlusOutlined,MinusCircleOutlined,AppstoreOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Alert
} from 'antd';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header from '../Header/header';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 8,
    },
  },
};

const NewProduct = () => {
  const user = useSelector((state) => state.user)
  const [form] = Form.useForm();
  const [addform] = Form.useForm();
  const [categories, setCategories] = useState([])
  const [productData, setProductData] = useState([])
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isUpdate, setUpdate] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addCodes, setAddCodes] = useState(false);
  const props = {
    name: 'images',
    action: `${process.env.REACT_APP_API_URL}/uploads`,
    headers: {
      authorization: 'authorization-text',
    },
    accept: '.jpg, .jpeg, .png',
    multiple: true,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Chỉ cho phép tải lên tệp JPG hoặc PNG!');
      }
      return isJpgOrPng;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const uploadedFilePaths = info.fileList
          .filter((file) => file.status === 'done')
          .map((file) => file.response.imageUrls);
        const allImageUrls = [].concat(...uploadedFilePaths);
        form.setFieldsValue({ pictures: allImageUrls });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  const propss = {
    name: 'images',
    action: `${process.env.REACT_APP_API_URL}/uploads`,
    headers: {
      authorization: 'authorization-text',
    },
    accept: '.jpg, .jpeg, .png',
    multiple: true,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Chỉ cho phép tải lên tệp JPG hoặc PNG!');
      }
      return isJpgOrPng;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const uploadedFilePaths = info.fileList
          .filter((file) => file.status === 'done')
          .map((file) => file.response.imageUrls);
        const allImageUrls = [].concat(...uploadedFilePaths);
        addform.setFieldsValue({ pictures: allImageUrls });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`,{headers})
      .then((response) => {
        setProductData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  const headers = {
    token: `Bearers ${user.access_token}`,
  };
  const onFinish = async (values) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/product/addProduct`, 
        {
          ...values,
          codes: codes,
        }, 
        { headers }
      );
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`, { headers });
      setProductData(response.data.data);
  
      message.success('Thêm sản phẩm thành công');
      addform.resetFields();
      setCodes([]);
    } catch (error) {
      message.error(error.message || 'Có lỗi xảy ra khi thêm sản phẩm');
    }
  };
  
  
  const handleSaveEdit = (id, values) => {
    const productId = id;
    axios.put(`${process.env.REACT_APP_API_URL}/product/editProduct/${productId}`, values, { headers })
      .then((response) => {
        const updatedProduct = response.data.data;
  
        setProductData((prevData) => {
          return prevData.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          );
        });
  
        message.success('Sửa sản phẩm thành công');
        form.resetFields();
        setUpdate(false);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật sản phẩm: ", error);
      });
  };
  
  const [codes, setCodes] = useState([]);

  const handleAddCode = () => {
    setCodes([...codes, '']);
  };
  
  const handleCodeChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };  
  const handleDeleteProduct = (productId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/product/deleteProduct/${productId}`,{ headers })
      .then((response) => {
        const updatedProducts = productData.filter(product => product._id !== productId);
        message.success('Xoá sản phẩm thành công')
        setProductData(updatedProducts);
      })
      .catch((error) => {
        console.error('Lỗi khi xóa sản phẩm: ', error);
      });
  };
  const handleAddCodeProduct = async (productId,values) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/product/addCodes/${productId}`,{
        values,
        codes: codes,
      },  { headers });
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`, { headers });
      setProductData(response.data.data);
      message.success('thành công')
      form.resetFields()
      setCodes([]);
    } catch (error) {
      console.error('Đã bị trùng mã sản phẩm: ', error);
    }
  };
  
  const columns = [
    {
      title: 'Tên game',
      dataIndex: 'name',
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      render: category => category.name
    },
    {
      title: 'Nền tảng',
      dataIndex: 'platform',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
    },
    {
      title: "Hình ảnh hiển thị",
      dataIndex: "pictures",
      render: pictures => (
        <div style={{
          display: "flex",
          flexWrap: "wrap",  
        }}>
          {pictures.map((imageUrl, index) => (
              <img
                src={imageUrl}
                alt={`Thumbnail ${index}`}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
                loading="lazy"
              />
          ))}
        </div>
      ),
    },    
    {
      title: 'Thao tác',
      dataIndex: "_id",
      render:  record => (
        <Space size="middle">
          <a>
              <EditOutlined onClick={() =>  {      
                setCurrentProductId(record)
              setUpdate(true);
            }} /> 
            </a>
          <a onClick={() => {setDeleteModalVisible(true); setCurrentProductId(record);}}> <DeleteOutlined /></a>
          <a onClick={() => {setAddCodes(true); setCurrentProductId(record);}}> <PlusOutlined /></a>
          <Modal
                  title="Thêm code"
                  visible={addCodes}
                  onOk={() => {
                    form
                      .validateFields()
                      .then((values) => {
                      handleAddCodeProduct( currentProductId, values);
                        setAddCodes(false);
                      })
                      .catch((errorInfo) => {
                        console.error('Validation failed:', errorInfo);
                      });
                  }}
                  onCancel={() => {
                    setAddCodes(false);
                  }}
                >
                  <Form
                    {...formItemLayout}
                    form={form}
                    style={{
                      maxWidth: 600,
                    }}
                    scrollToFirstError
                  >
                    <Form.Item label="Codes">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {codes.map((code, index) => (
                      <Input
                        key={index}
                        value={code}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                      />
                    ))}
                    <Button type="dashed" onClick={handleAddCode}>
                      Thêm Code
                    </Button>
                  </Space>
                </Form.Item>
                  </Form>
                </Modal>  
                  <Modal
          title="Xác nhận xoá sản phẩm"
          visible={isDeleteModalVisible}
          onOk={() => {
            handleDeleteProduct(currentProductId)
            setDeleteModalVisible(false); 
          }}
          onCancel={() => setDeleteModalVisible(false)} 
        >
          <p>Bạn có chắc chắn muốn xoá sản phẩm này?</p>
        </Modal>
         <Modal title="Sửa thông tin sản phẩm"
            visible={isUpdate}
            onOk={() => {
              form
              .validateFields()
              .then((values) => {
                handleSaveEdit(currentProductId, values);
                setUpdate(false);
              })
              .catch((errorInfo) => {
                console.error('Validation failed:', errorInfo);
              });
            }}
            onCancel={() => {
              setUpdate(false);
            }}
          >  
          <Form
                {...formItemLayout}
                form={form}
                style={{
                  maxWidth: 600,
                }}
                scrollToFirstError
              >
                <Form.Item
                  name="name"
                  label="Tên Game"
                >
                  <Input/>
                </Form.Item>

                <Form.Item
                  name="platform"
                  label="Nền tảng"
              
                >
                    <Input />
                </Form.Item>
                   <Form.Item
                    name="pictures"
                    label="Hình ảnh"
                  >
                    <Upload {...props}>
                       <Button icon={<UploadOutlined />}>Ảnh</Button>
                     </Upload>
               </Form.Item>
                <Form.Item
                  name="description"
                  label="Mô tả"
                >
                  <ReactQuill
                    theme="snow" 
                    placeholder="Nhập mô tả ở đây..." 
                  />
                </Form.Item>
              </Form>
            </Modal>
            </Space>
    )}
  ]
  return (
    <>
    <Header></Header>
    <br></br>
    <Form
      {...formItemLayout}
      form={addform}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Tên game"
        rules={[
          {
            required: true,
            message: 'Điền tên của sản phẩm',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="categoryName"
        label="Thể loại"
        rules={[
          {
            required: true,
            message: 'Chọn thể loại',
          },
        ]}
      >
        <Select placeholder="Chọn danh mục">
          {categories.map((category) => (
            <Option key={category.id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="platform"
        label="Nền tảng"
        rules={[
          {
            required: true,
            message: 'Điền nền tảng của sản phẩm',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Giá"
        rules={[
          {
            required: true,
            message: 'Điền giá của sản phẩm',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="pictures"
        label="Hình ảnh"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn ảnh',
          },
        ]}
      >
        <Upload {...propss}>
          <Button icon={<UploadOutlined />}>Ảnh</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="description"
        label="Mô tả"
        rules={[
          {
            required: true,
            message: 'Vui lòng điền mô tả bảo hành',
          },
        ]}
      >
        <ReactQuill
          theme="snow"
          placeholder="Nhập mô tả ở đây..."
        />
      </Form.Item>
      <Form.Item label="Codes">
        <Space direction="vertical" style={{ width: '100%' }}>
          {codes.map((code, index) => (
            <Input
              key={index}
              value={code}
              onChange={(e) => handleCodeChange(index, e.target.value)}
            />
          ))}
          <Button type="dashed" onClick={handleAddCode}>
            Thêm Code
          </Button>
        </Space>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form.Item>
    </Form>
    <Table columns={columns} dataSource={productData} />
    </>
  );
};
export default NewProduct;