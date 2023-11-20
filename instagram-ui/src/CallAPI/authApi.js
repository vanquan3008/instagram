
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
    logOutError ,
    userFollowSucessfully ,
    userUnFollowSucessfully
} from "~/Redux/authSlice";

export const loginUser = async (user , dispatch , navigate) => {
    dispatch(loginStart())
    try{
        const res = await axios.post('http://localhost:3000/auth/login' , user); 
        dispatch(loginSucessfully(res.data)) 
        navigate(0)
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
        dispatch(logOutSucessfully())
        navigate('/')
    }
    catch(error){
        dispatch(logOutError())
    }
}

// follow 
export const followFunction  = async (userid, userCurrent , dispatch ) =>{
    await axios.put(`http://localhost:3000/auth/${userid}/follower` , {"userId" : userCurrent._id})
    try{
        dispatch(userFollowSucessfully(userid))
    }
    catch(error){
        console.log(error)
    }
}

//unfollow
export const unfollowFunction  = async (userid, userCurrent , dispatch) =>{ 
    await axios.put(`http://localhost:3000/auth/${userid}/unfollower` , {"userId" : userCurrent._id})
    try{
        dispatch(userUnFollowSucessfully(userid))
    }
    catch(error){
        console.log(error)
    }
}