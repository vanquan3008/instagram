
import axios from "axios";
import { 
    loginError, 
    loginStart, 
    loginSucessfully, 
    registerStart, 
    registerSuccess,
    registerError,
    logOutStart,
    logOutSucessfully,
    logOutError 
} from "~/Redux/authSlice";

export const loginUser = async (user , dispatch , navigate) => {
    dispatch(loginStart())
    try{
        const res = await axios.post('http://localhost:3000/auth/login' , user); 
        dispatch(loginSucessfully(res.data)) 
        navigate("/")
    }
    catch(err){
        dispatch(loginError())
    }
}

export const registerUser = async (user , dispatch ,navigate ) => {
    dispatch(registerStart())
    try{
        await axios.post('http://localhost:3000/auth/register' , user);
        dispatch(registerSuccess())
        navigate("/")
    }
    catch(err){
        dispatch(registerError())
    }
}
export const logOut = async ( dispatch , id , navigate , token , axiosJWT )=>{
    dispatch(logOutStart())
    try{
        await axiosJWT.post('http://localhost:3000/auth/logout', id ,{
            headers : {token : `Bearer ${token}`}
        });
        console.log(token)
        dispatch(logOutSucessfully())
        navigate('/')
    }
    catch(error){
        dispatch(logOutError())
    }
}