import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';


import { faGear } from '@fortawesome/free-solid-svg-icons'; 
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
const listitem = [
    {
        iconitem : faHouse , 
        nameitem : 'Home',
        link : '/'
    },
    {
        iconitem : faMagnifyingGlass ,
        nameitem : 'Search',
    },
    {
        iconitem : faCompass ,
        nameitem : 'Explore',
    },
    {
        iconitem : faClapperboard ,
        nameitem : 'Reels',
        link:'/reels'
    },
    {
        iconitem : faFacebookMessenger ,
        nameitem : 'Message',
        link : '/message'
    },
    {
        iconitem : faHeart ,
        nameitem : 'Notification',
    },
    {
        iconitem : faSquarePlus ,
        nameitem : 'Create',
    },

];

const listmore = [
    {iconitem : faGear , nameitem : 'Settings'},
    {iconitem : faSpinner , nameitem : 'Your activity'},
    {iconitem : faBookmark , nameitem : 'Save'},
    {
        iconitem : faSun ,
        nameitem : 'Switch appeareance',
        children: {
            title : 'Switch appeareance',
            data : [
                {
                    block :'true' , 
                    type  : 'Box-2'
                },

                {
                    iconitem : 'false',
                    nameitem :'Dark mod' , 
                    change : 'true'
                }
            ]
        }

    },
    {iconitem : faCircleExclamation , nameitem : 'Report a problem'},
    {block :'true' , type  : 'Box-1'},
    {iconitem : 'false' , nameitem : 'Switch Account'},
    {block :'true' , type  : 'Box-2'},
    {
        iconitem : 'false' , 
        nameitem : 'Log out',
        link :'/login'
    },
]

export  {listitem , listmore};