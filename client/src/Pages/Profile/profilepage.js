import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBListGroupItem,
  MDBCardTitle,
  MDBCardLink,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
} from 'mdb-react-ui-kit';
import { Card, Col, Collapse, Modal, Row } from 'antd';
import UpdateUser from './updateUser';
import ChangePassword from './changepass'
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useSelector } from "react-redux";
import Header from '../../Componant/Header/header';



const Profilepage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])
  const user = useSelector((state) => state.user)
  const [centredModal1, setCentredModal1] = useState(false);
  const [centredModal2, setCentredModal2] = useState(false);


  const toggleShow1 = () => setCentredModal1(!centredModal1);
  const toggleShow2 = () => setCentredModal2(!centredModal2);
console.log("user",user.addRess)
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Header></Header>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">

                <div className="text-muted mb-1"></div>
                <div className="text-muted mb-1"></div>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={toggleShow1} style={{ backgroundColor: "#8c52ff" }}>Cập nhật thông tin</MDBBtn>
                  <MDBBtn onClick={toggleShow2} className="ms-1" style={{ border: '2px solid #8c52ff', color: '#8c52ff', backgroundColor: '#F5F5F5' }}>Đổi mật khẩu</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Tên đăng nhập</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.userName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Số điện thoại</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.phone_number}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Địa chỉ</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.addRess}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Modal
        visible={centredModal1}
        onCancel={toggleShow1}
        footer={null}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <UpdateUser></UpdateUser>
          </MDBModalContent>
        </MDBModalDialog>
      </Modal>

      <Modal
        visible={centredModal2}
        onCancel={toggleShow2}
        footer={null}>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <ChangePassword></ChangePassword>
          </MDBModalContent>
        </MDBModalDialog>
      </Modal>

    </section>
  )
}

export default Profilepage