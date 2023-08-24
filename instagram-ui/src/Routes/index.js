import Home from '~/Pages/Home';
import Reels from '~/Pages/Reels';
import Message from '~/Pages/Message'

// Public Router
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/reels', component: Reels },
    { path:'/message', component: Message }
];
// Private Router
const privateRoutes = {};

export { publicRoutes, privateRoutes };
