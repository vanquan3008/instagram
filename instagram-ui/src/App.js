import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '~/Pages/Home';
import Reels from '~/Pages/Reels';
import Profile from '~/Pages/Profile';
import Register from '~/Pages/Register';
import Login from '~/Pages/Login';
import Messages from './Pages/Messages';
import { store } from './Redux/store';

function App() {
    const user = store.getState().auth.login.currentUser;
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>          
                    <Route path="/" element={user ? <Home/> : <Login/>}/>
                    <Route path="/register" element={user ? <Home/> : <Register/> }/>
                    <Route path="/reel" element={ <Reels/> }/>
                    <Route path="/messages" element={ <Messages/> }/>
                    <Route path="/profile/:username" element={ <Profile/> }/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
