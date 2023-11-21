import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Hidden } from '@mui/material';
import { Link } from "react-router-dom"; // Thêm import Link
import { WrapperPhoneCart } from './style';
import { removeItemFromCart } from './cart';
import Header from '../../Componant/Header/header';

function CartList() {

  const [modalDelete, setModalDelete] = useState(false);
  const [currentCartId, setCurrentCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);


  const handleDeleteCartItem = () => {
    removeItemFromCart(currentCartId);

    const updatedCartItems = cartItems.filter(item => item.product !== currentCartId);
    setCartItems(updatedCartItems);

    setModalDelete(false);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);
  const calculateTotalPrice = () => {
    if (cartItems.length === 0) {
      return 0;
    }
  
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const columns = [
    {
      title: 'Tên game ',
      dataIndex: 'name',
      render: (record, rowData) => (
        <div>
          <img src={rowData.pictures} alt={record} style={{ width: '100px', marginLeft: '10px' }} />
          &nbsp;
          <span style={{ fontSize: "15px" }}>{record}</span>
        </div>
      ),
    },
    
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      render: price => (
        <span style={{ fontSize: '17px', fontWeight: 'bold' }}>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(price)}
        </span>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (record) => {
        return (
          <div>
            <a onClick={() => { setModalDelete(true); setCurrentCartId(record.product) }}> <DeleteOutlined /></a>
            <Modal
              title="Xoá giỏ hàng"
              visible={modalDelete}
              onOk={() => {
                handleDeleteCartItem(currentCartId);
                setModalDelete(false);
              }}
              onCancel={() => setModalDelete(false)}
            >
              <p>Bạn có chắc chắn muốn xoá sản phâm {record.name} này khỏi giỏ hàng?</p>
            </Modal>
          </div>
        );
      },
    },
  ];
      return (
        
        <>
        <Header></Header>
     <Table
        columns={columns}
        dataSource={cartItems}
        pagination={false}
      />
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Tổng giá:&nbsp;</span>
              <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF3300' }}>
              {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(calculateTotalPrice())}
              </span>
              <Link to="/payment-infor">
                <Button size='large' style={{ marginLeft: '100px', background: '#8c52ff', color: '#fff' }} >Mua hàng</Button>
              </Link>
            </div>
          </div>
      
        </>
     
      );
}

export default CartList;
