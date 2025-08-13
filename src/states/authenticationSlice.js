import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
      api_token : "",
      settings : {}    
    },
    reducers: {
      login : (state, action) => {
        state.api_token = action.payload?.api_token;
        localStorage.setItem("api_token", action.payload?.api_token);
      },
      setSettings :(state, action) => {
        state.settings = action.payload;
        localStorage.setItem("ticket_settings", JSON.stringify(action.payload));
      },
      logout: (state) => {
        state.api_token = "";
        localStorage.removeItem('api_token');
        axios.defaults.headers.common['Authorization'] = "";
      }
    },
  });
  
  export const { login, logout, setSettings } = authenticationSlice.actions;
  export default authenticationSlice.reducer;