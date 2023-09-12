import { configureStore } from '@reduxjs/toolkit';
import  authReduces from './authSlice.js';


export default configureStore({
    reducer : {
        auth : authReduces
    },
});