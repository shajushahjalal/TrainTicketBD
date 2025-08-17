import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
      api_token : "",
      user_date : {},
      settings : {},
      selected_tckets : []  
    },
    reducers: {
      login : (state, action) => {
        state.api_token = action.payload;
        localStorage.setItem("api_token", action.payload);
      },
      setSettings :(state, action) => {
        state.settings = action.payload;
        localStorage.setItem("ticket_settings", JSON.stringify(action.payload));
      },
      setUserData : (state, action) => {
        state.user_date = action.payload;
        localStorage.setItem("user_date", JSON.stringify(action.payload));
      },
      setSelectedTickets : (state, action) => {
        state.selected_tckets = action.payload;
        localStorage.setItem("selected_tckets", JSON.stringify(action.payload));
      },
      logout: (state) => {
        state.api_token = "";
        state.user_date = {};
        localStorage.removeItem('api_token');
        localStorage.removeItem('user_date');
        axios.defaults.headers.common['Authorization'] = "";
      }
    },
  });
  
  export const { login, logout, setSettings, setUserData, setSelectedTickets } = authenticationSlice.actions;
  export default authenticationSlice.reducer;