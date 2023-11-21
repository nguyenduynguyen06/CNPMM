import React, { useState } from "react";
import {  DatePicker } from "antd";
import { MDBBtn, MDBContainer, MDBCardBody, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";
import axios from 'axios';



const UpdateUser = () => {
  const user = useSelector((state) => state.user);
  const headers = {
    token: `Bearers ${user.access_token}`,
};
  const [user1, setUser1] = useState({
    addRess: user.addRess || "",
    phone_number: user.phone_number || "",
  });

  const onChange = (name, value) => {
    setUser1({ ...user1, [name]: value });
  }

  const updateUser = async (event) => {
    event.preventDefault();
    try {
      const updatedData = {};
      if (user1.addRess) {
        updatedData.addRess = user1.addRess;
      }
      if (user1.phone_number) {
        updatedData.phone_number = user1.phone_number;
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/update/${user._id}`,
        updatedData,
        { headers }
      );

      window.location.reload();
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
    }
  };

  return (
    <form className="form-add-new" onSubmit={updateUser}>
      <MDBContainer fluid style={{ zIndex: 999 }}>
        <MDBCardBody className='p-5 text-center'>
          <h2 className="fw-bold mb-5">Cập nhật thông tin</h2>
          <MDBRow>

            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Địa chỉ' name="addRess" value={user1.addRess} onChange={(e) => onChange("addRess", e.target.value)} type='text' tabIndex="2" />
            </MDBCol>
            </MDBRow>
          <MDBInput wrapperClass='mb-4' label='Số điện thoại' name="phone_number" value={user1.phone_number} onChange={(e) => onChange("phone_number", e.target.value)} type='text' tabIndex="3" />
          <br />
          <a href="/profile"> <MDBBtn className='w-100 mb-4' size='md' style={{ background: '#FF3300' }}>Lưu</MDBBtn> </a>
        </MDBCardBody>
      </MDBContainer>
    </form>
  )
}

export default UpdateUser;
