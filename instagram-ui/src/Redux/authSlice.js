import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currrentUser : null,
            isFetching : false,
            error : null,
        }
    },
    reducers :{
        loginStart : (state)=>{
            state.isFetching = true ;
        },
        loginSucessfully : (state , action)=>{
            state.isFetching = false;
            state.currrentUser = action.payload;
            state.error = false;
        },
        
        loginError : (state)=>{
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {
    loginStart,
    loginSucessfully,
    loginError
} = authSlice.actions;

export default authSlice.reducer;