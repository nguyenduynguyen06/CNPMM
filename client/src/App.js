import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { isJsonString } from './ultil';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/Slide/userSlice';
import Header from './Componant/Header/header';
function App() {
  const dispatch = useDispatch();
  const axiosJWT  = axios.create();
  useEffect(()=>{
    const {storageData, decoded} = handleDecoded()
        if(decoded.id){
            handleGetDetails(decoded.id,storageData)
      }
  },[])
  const handleDecoded = ()=>{
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
        decoded = jwt_decode(storageData);
    }
    return {decoded,storageData}
  }
  const handleGetDetails = async (id,access_Token) => {
    try {
      const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-Detail/${id}`, {
          headers: {
            token: `Bearer ${access_Token}`, 
          }
      })
        dispatch(updateUser({...res.data.data, access_token: access_Token}))
  } catch (err) {
      console.log('Lỗi:', err);
  }
}
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            return (
              <Route key={route.path} path={route.path} element={
                  <>
            <Page/>
                </>
              } />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
