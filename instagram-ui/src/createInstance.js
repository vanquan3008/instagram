import axios from "axios";
import jwt_decode from "jwt-decode";
//Function refresh token
const refreshToken =  async () =>{
    try{
        const res = await axios.post('http://localhost:3000/auth/refreshtoken',{
            withCredentials : true ,
        })
        return res.data();
    }
    catch(err){

    }
}
// Create new interceptor instance  
export const createAxios = (user , dispatch,stateSuccess)=>{
    const newinstance = axios.create();
    newinstance.interceptors.request.use(
        async(config) => {
            const tokendecode = jwt_decode(user.token);
            const date =new Date();
            if(tokendecode.exp < date.getTime()/1000){
                const data =  refreshToken();
                const refreshuser = {
                    ...user,
                    token: data.newtoken,
                }

                dispatch(stateSuccess(refreshuser))
                config.headers['token'] = `Bearer ${data.newtoken}`
            }
             
            return config;
        },
        (err)=>{
            Promise.reject(err);
        }
       
    )
    return newinstance;
}