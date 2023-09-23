import classNames from "classnames/bind";
import style from './ProfileStyle.module.scss';

import { FooterLayOut } from "~/Components/Layout/DefaultLayout/Footer";
import { Imgs } from "~/Components/Image";
import image from "~/Assets/img/index.js";
import { icons } from "~/Assets/icons";
import { DefaultLayout } from "~/Components/Layout";
//import { useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from "axios";


const cx = classNames.bind(style);

function Profile() {
    const [user, setUser] = useState({
        followers : [],
        followings : [],
    })
    const username = useParams().username;

    useEffect( () => {
        const fetchUsers = async () => {
            const restore = await  axios.get(`http://localhost:3000/auth/${username}`)
            setUser(restore.data)
        }
        fetchUsers()
    }, [username]);
    console.log(user)
    const countUserfollowers =  user.followers.length;
    const countUserfollowings = user.followings.length

    return ( 
        <DefaultLayout>
            <div className={cx('register')}>
                <main className={cx('main')}>
                    <div className={cx('header')}>
                        <div className={cx('avatar')}>
                            <button className={cx('avatar__upload--btn')}>
                                <Imgs 
                                    className ={cx('avatar__img')}  
                                    src = {user?.profilePicture === "" ? image.noImage : user.profilePicture}>    
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
                                    {user.fullname}
                                </div>
                                <div className={cx('description')}>
                                    {user.description}
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
    );
}

export default Profile;