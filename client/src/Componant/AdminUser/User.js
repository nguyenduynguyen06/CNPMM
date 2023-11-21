import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { message, Modal, Space, Table, Upload } from 'antd';
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined,PlusOutlined,AppstoreOutlined } from '@ant-design/icons';
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

const User = () => {
    
  const user = useSelector((state) => state.user)
  const headers = {
    token: `Bearers ${user.access_token}`,
  };
  const [form] = Form.useForm();
  const [userData, setUserData] = useState([]);
  const [addQuantity,setaddQuantity] = useState(false)
  const [userId,setUserId] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {headers})
         .then((response) => {    
          setUserData(response.data.data); })
          .catch((response) => {
            console.log("lỗi")
          }); 
  }, []);
  const handleAddQuantity = async (userid,values) => {
      axios.post(
        `${process.env.REACT_APP_API_URL}/user/${userid}/deposit`, values,
        { headers }
      ).then((response) => {
        setaddQuantity(false)
      }).catch((response) => {

      });
  };
  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'userName',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'addRess',
    },
    {
      title: 'Số tiền trong tài khoản',
      dataIndex: 'balance',
    },
    {
        title: 'Thao tác',
        dataIndex: "_id",
        render:  record => (
        <Space size="middle">
          <a>
          <PlusOutlined  onClick={() =>  {      
                setUserId(record)
                setaddQuantity(true);
            }} /> 
            </a>
            <Modal
                  title="Cộng thêm số lượng"
                  visible={addQuantity}
                  onOk={() => {
                    form
                      .validateFields()
                      .then((values) => {
                      handleAddQuantity( userId, values);
                        setaddQuantity(false);
                      })
                      .catch((errorInfo) => {
                        console.error('Validation failed:', errorInfo);
                      });
                  }}
                  onCancel={() => {
                    setaddQuantity(false);
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
                      name="amount"
                      label="Cộng thêm tiền"
                    >
                      <Input />
                    </Form.Item>
                  </Form>
                </Modal>  
            </Space>
    )
    }
  ]
  return (
    <>
    <Header></Header>
    <Table columns={columns} dataSource={userData} />
    </>
  );
};
export default User;