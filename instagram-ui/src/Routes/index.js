import Home from '~/Pages/Home';
import Reels from '~/Pages/Reels';
import Profile from '~/Pages/Profile';
import Register from '~/Pages/Register';
import Login from '~/Pages/Login';

import Messages from '~/Pages/Messages';

// Public Router
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/reels', component: Reels },
    { path:'/messages', component: Messages },
    { path:'/profile', component: Profile },
    { path:'/login', component: Login , Layout : null},
    { path:'/register', component: Register,Layout : null },
];
// Private Router
const privateRoutes = {
    
};

export { publicRoutes, privateRoutes };
