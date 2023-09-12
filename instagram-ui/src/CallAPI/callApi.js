import axios from "axios";
import { loginError, loginStart, loginSucessfully } from "~/Redux/authSlice";


export const loginUser = async (user , dispatch , navigate) => {
    dispatch(loginStart())
    try{
        const res = await axios.post('http://localhost:3000/auth/login' , user);
        dispatch(loginSucessfully(res.data))
        navigate('/')
    }
    catch(err){
        dispatch(loginError())
    }
}
