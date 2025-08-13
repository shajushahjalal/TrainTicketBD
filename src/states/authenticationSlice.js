import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
      access_token : "",
      userCredential : {}
    },
    reducers: {
      login : (state, action) => {
        state.userCredential = action.payload?.userCredential;
        state.access_token = action.payload?.access_token;
        localStorage.setItem("access_token", action.payload?.access_token);
        localStorage.setItem("userCredential", JSON.stringify(action.payload?.userCredential));
        axios.defaults.headers.common['Authorization'] = "Bearer "+ action.payload?.access_token;
      },
      logout: (state) => {
        state.access_token = "";
        state.userCredential = {};
        localStorage.removeItem('access_token');
        localStorage.removeItem('userCredential');
        axios.defaults.headers.common['Authorization'] = "";
      }
    },
  });
  
  export const { login, logout } = authenticationSlice.actions;
  export default authenticationSlice.reducer;