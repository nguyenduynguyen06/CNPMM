import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  userName: '',
  role_id: '',
  access_token: '',
  address: '', // Fix typo in variable name from addRess to address
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { _id, userName, role_id, access_token, addRess,phone_number } = action.payload;
      state._id = _id;
      state.userName = userName;
      state.role_id = role_id;
      state.access_token = access_token;
      state.addRess = addRess; 
      state.phone_number = phone_number;
    },
    resetUser: (state) => {
      state._id = '';
      state.userName = '';
      state.role_id = '';
      state.access_token = '';
      state.addRess = ''; 
      state.phone_number = '';
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
