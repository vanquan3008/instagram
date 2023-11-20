import classNames from "classnames/bind";
import style from './ProfileStyle.module.scss';

import { FooterLayOut } from "~/Components/Layout/DefaultLayout/Footer";
import { Imgs } from "~/Components/Image";
import image from "~/Assets/img/index.js";
import { icons } from "~/Assets/icons";
import { DefaultLayout } from "~/Components/Layout";
//import { useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { UserFollowing } from "~/Components/UserFollowing";
import {followFunction} from "~/CallAPI/authApi.js"


const cx = classNames.bind(style);

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [hidden , sethidden] = useState(true);
    const [user, setUser] = useState({
        followers : [],
        followings : [],
    })
    const userCurrent = useSelector((state)=>state.auth.login.currentUser);
    const username = useParams().username;

    useEffect( () => {
        const fetchUsers = async () => {
            const restore = await  axios.get(`http://localhost:3000/auth/${username}`)
            setUser(restore.data)
        }
        fetchUsers()
    }, [username , userCurrent]);

    const followUser = (e) =>{
        e.preventDefault();
        if(user._id !== userCurrent._id){
            followFunction(user._id ,userCurrent ,dispatch , navigate)
        }
    }
    const countUserfollowers =  user.followers.length;
    const countUserfollowings = user.followings.length;
    return ( 
        <>
            <DefaultLayout>
                <div className={cx('register')}>
                    <main className={cx('main')}>
                        <div className={cx('header')}>
                            <div className={cx('avatar')}>
                                <button className={cx('avatar__upload--btn')}>
                                    <Imgs 
                                        className ={cx('avatar__img')}  
                                        src = {user?.profilePicture === "" ? image.noAvatar : user.profilePicture}>    
                                    </Imgs>
                                </button>
                            </div>
                            <div className={cx('info__user')}>
                                <div className={cx('info__general')}>
                                    <div className={cx('info__name')} >
                                       <button className={cx('info__name--link')} >
                                            {user?.username}
                                        </button>
                                    </div>
                                    {
                                    userCurrent?._id === user?._id ?
                                    <>
                                        <div className={cx('edit__profile')}>
                                            <button className={cx('edit__profile--link')}>
                                                Edit profile
                                            </button>
                                        </div>
                                        <div className={cx('settings')}>
                                            <Imgs 
                                                src = {icons.icongear}
                                                className={cx('settings-icon')}
                                            ></Imgs>
                                        </div>
                                    </>
                                    :
                                    <div className={cx('not_own')}>
                                        <div className={cx('list__button')}>
                                            {
                                                userCurrent?.followings.includes(user._id) ? 
                                                <div className={cx('list__button--follower')}>
                                                    <button className={cx('button--folloing')} onClick={()=>sethidden(false)}>
                                                        Following
                                                        <FontAwesomeIcon icon={faCaretDown} className={cx('button--folloingicon')}></FontAwesomeIcon>
                                                    </button>
                                                    <a href={`/messages/${user._id}`} className={cx('button--message')} >
                                                        Message
                                                    </a>
                                                </div>
                                                : 
                                                <button className={cx('button__follow')} onClick={followUser}>Follow</button>
                                            }
                                        </div>
                                        <div className={cx('similar__account')}>
                                            <Imgs src={icons.iconSimilarAccount} className={cx('similar__account--icon')}></Imgs>
                                        </div>
                                        <div className={cx('Options')}>
                                            <FontAwesomeIcon className={cx('options-icon')} icon = {faEllipsis}></FontAwesomeIcon>
                                        </div>
                                    </div>
                                    }
                                </div>
                                <div className={cx('space_20')}></div>
                                <ul className={cx('info__social')}>
                                    <li className={cx('user__post')}>
                                        <span>0</span> post
                                    </li>
                                    <li className={cx('user__follower')}>
                                        <span>{countUserfollowers}</span> followers
                                    </li>
                                    <li className={cx('user__following')}>
                                        <span>{countUserfollowings}</span> followings
                                    </li>
                                </ul>
                                <div className={cx('info__detail')}>
                                    <div className={cx('fullname')}>
                                        {user?.fullname}
                                    </div>
                                    <div className={cx('description')}>
                                        {user?.description}
                                    </div>
                                </div>
        
                            </div>
                        </div>
                        
                    </main>
                    <div className={cx('container')}>
                        <div className={cx('item')}>
                            <div className={cx('allpost__icon')}>
                                <Imgs src={icons.iconposts}></Imgs>
                            </div>
                            <span>POSTS</span>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('saves__icon')}>
                                <Imgs src={icons.iconsaved}></Imgs>
                            </div>
                            <span>SAVED</span>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('tagged__icon')}>
                                <Imgs src={icons.icontagged}></Imgs>
                            </div>
                            <span>TAGGED</span>
                        </div>
                        <article className={cx('article')}>
        
                        </article>
        
                    </div>
        
                    
                   <div className={cx('footer__main')}> 
                        <FooterLayOut ></FooterLayOut>
                    </div>
        
                </div>
        
            </DefaultLayout>
            <UserFollowing 
                userCurrrentProfile={user} 
                defaulhidden = {hidden} 
               sethiddentable = {sethidden}
            ></UserFollowing>
        </>
    );
}

export default Profile;