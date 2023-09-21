import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Fragment} from 'react';
// import { publicRoutes } from '~/Routes';
// import { DefaultLayout } from '~/Components/Layout';
import Home from '~/Pages/Home';
import Reels from '~/Pages/Reels';
import Profile from '~/Pages/Profile';
import Register from '~/Pages/Register';
import Login from '~/Pages/Login';
// import Messages from '~/Pages/Messages';
// import { useSelector } from 'react-redux';
import Messages from './Pages/Messages';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
//import { useEffect } from 'react';
import { store } from './Redux/store';

function App() {

    // useEffect(()=>{
    //     if(users){
    //         localStorage.setItem("user", JSON.stringify(users))
    //     }
    // },[users])
    // console.log(users)

    // let user = localStorage.getItem('user'); 
    const user = store.getState().auth.login.currrentUser;
    console.log(user)
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>          
                    <Route path="/" element={user ? <Home/> : <Login/>}/>
                    <Route path="/register" element={user ? <Home/> : <Register/> }/>
                    <Route path="/reel" element={ <Reels/> }/>
                    <Route path="/messages" element={ <Messages/> }/>
                    <Route path="/profile" element={ <Profile/> }/>

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
