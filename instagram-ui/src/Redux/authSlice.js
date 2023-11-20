import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        // Login 
        login: {
            currentUser : null,
            isFetching : false,
            error : null,
        },
        //Register
        register : {
            isFetching : false,
            error : null,
            success : null,
        },
    },
    reducers :{
        //Login 
        loginStart : (state)=>{
            state.login.isFetching = true ;
            state.login.error = false;
        },
        loginSucessfully : (state , action)=>{
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        
        loginError : (state)=>{
            state.login.isFetching = false;
            state.login.error = true;
        },
        //Register
        registerStart : (state)=> {
            state.register.isFetching = true ;
        },
        registerSuccess :(state) => {
            state.register.isFetching =  false;
            state.register.success =  true;
            state.register.error =  false;
        },
        registerError :  (state) =>{
            state.register.error = true;
            state.register.success = false;
            state.register.isFetching = false;
        },
        //Logout 
        logOutStart : (state)=>{
            state.login.isFetching = true ;
        },
        logOutSucessfully : (state)=>{
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logOutError : (state)=>{
            state.login.isFetching = false;
            state.login.error = true;
        },

        // Follow
        userFollowSucessfully : (state , action)=>{
            state.login.currentUser.followings = [...state.login.currentUser.followings , action.payload];
        },
            
           
        //Unfollow
        userUnFollowSucessfully : (state , action)=>{
            state.login.currentUser.followings = state.login.currentUser.followings.filter(following => following !== action.payload)
        },
    }
})

export const {
    loginStart,
    loginSucessfully,
    loginError,
    registerStart,
    registerSuccess,
    registerError,
    logOutStart,
    logOutSucessfully,
    logOutError,

    userFollowSucessfully,
    userUnFollowSucessfully
} = authSlice.actions;

export default authSlice.reducer;
export {authSlice};