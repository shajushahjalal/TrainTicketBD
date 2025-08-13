import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../states/authenticationSlice'

export default configureStore({
  reducer: {
    authentication : authenticationReducer
  },
})