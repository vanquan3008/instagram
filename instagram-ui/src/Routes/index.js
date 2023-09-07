import Home from '~/Pages/Home';
import Reels from '~/Pages/Reels';
import Message from '~/Pages/Message';
import Profile from '~/Pages/Profile';

// Public Router
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/reels', component: Reels },
    { path:'/message', component: Message },
    { path:'/profile', component: Profile },
];
// Private Router
const privateRoutes = {};

export { publicRoutes, privateRoutes };
