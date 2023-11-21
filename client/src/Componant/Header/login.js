import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModal,
  MDBModalHeader
}
  from 'mdb-react-ui-kit';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from "../../redux/Slide/userSlice";



function Login({ onClose }) {
  const [message, setMessage] = useState('');
  const axiosJWT = axios.create();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    passWord: ''
  });
  const onChange = event => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);


  const loginHandler = async (event) => {
    event.preventDefault();
    try {
        axios
          .post(`${process.env.REACT_APP_API_URL}/user/Login`, user, {
            withCredentials: true,
          })
          .then((res) => {
            localStorage.setItem('access_token', JSON.stringify(res.data.access_Token));
            if (res.data.access_Token) {
              const decoded = jwt_decode(res.data.access_Token);
              if (decoded.id) {
                handleGetDetails(decoded.id, res.data.access_Token);
              }
            }
            navigate('/');
            onClose();
          })
          .catch((err) => {
            setMessage('Hãy kiểm tra lại email hoặc password');
          });
    } catch (error) {
      setMessage('Hãy kiểm tra lại email');
    }
  };

  const handleGetDetails = async (id, access_Token) => {
    try {
      const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-Detail/${id}`, {
        headers: {
          token: `Bearer ${access_Token}`,
        }
      })
      dispatch(updateUser({ ...res.data.data, access_token: access_Token }))
    } catch (error) {
      console.log('Lỗi:', error);
    }
  }



  return (
    <div>
      <form className="form-add-new" onSubmit={(e) => {
        loginHandler(e);
      }} >
        <MDBContainer fluid>
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
              <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                  {message && (
                    <h4 className="fw-bold mb-2 text-center">
                      <i className="fas fa-times-circle" style={{ color: 'red' }}>&nbsp;</i>
                      {message}
                    </h4>
                  )}

                  <h2 className="fw-bold mb-2 text-center">Đăng nhập</h2>
                  <p className="text-white-50 mb-3"></p>

                  <MDBInput wrapperClass='mb-4 w-100' label='Tên đăng nhập' name="userName" value={user.userName}  size="lg" onChange={onChange} />
                  <MDBInput wrapperClass='mb-4 w-100' label='Password' name="passWord" value={user.passWord} type='password' size="lg" onChange={onChange} />


                  <MDBBtn size='lg' type="submit" >
                    Login
                  </MDBBtn>
                  <div className=" text-center">
                    <hr className="my-4" />
                    <span style={{ fontSize: '15px', cursor: 'pointer', color: '#FF3300' }} clickable class="popup" onClick={toggleShow} >
                      Quên mật khẩu?
                    </span>
                  </div>
                </MDBCardBody>
              </MDBCard>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>


    </div>
  );
}

export default Login;