import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import image from '~/Assets/img';

import {listitem } from './listsb.js';
import { listmore } from './listsb.js';

import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React,{useState} from 'react';

import { Menu } from '~/Components/Layout/DefaultLayout/Menu/index.js';
import { Imgs } from '~/Components/Image/index.js';
import { SearchUI } from '~/Components/Layout/DefaultLayout/SearchUI/index.js';
import { Notifi } from '../Notification';
import { useSelector } from 'react-redux';
import UploadPost from '../UploadPost';
const cx = classNames.bind(styles);

function Sidebar({type}) {
    let clickMessage = null;
    const [ClickSearch , setClickSearch] = useState(false);
    const [ClickNoti ,setClickNoti] = useState(false);
    const [createPost ,setCreatePost] = useState(false);

    const user = useSelector((state) => state.auth.login.currentUser);
    const imageUser = user?.profilePicture;


    //Logic load page messages 
    (type === 'Message'&& ClickNoti === false && ClickSearch===false) ? clickMessage = true : clickMessage = false;
    return (
            <>
                <div className={cx('mainsidebar')}>
                    <div className={
                        cx('wrapper' , 
                            ClickSearch === true || ClickNoti === true || clickMessage === true ?'ChangeSize55px':'')
                    }>
                        <div className={cx('Sidebar__logo')}>
                            <div className={cx('logo-insta')}>
                                <a href="/" className={cx('logo-insta-link')}>
                                    <img src={
                                            ClickSearch === true || ClickNoti === true || clickMessage === true ? image.logochange:image.logo
                                        } 
                                        alt="Instagram" 
                                    />
                                </a>
                            </div>
                        </div>
                        <div className={cx('Sidebar__container')}>
                            <ul className={cx('container-list')}>
                                {listitem.map((item, index) => {
                                    return (
                                        <li className={cx('container-list-item',
                                            clickMessage === true && item.nameitem ==='Messages' ? 'onClickitem':'',
                                            ClickNoti === true && item.nameitem ==='Notification' ? 'onClickitem':'',
                                            ClickSearch === true && item.nameitem ==='Search' ? 'onClickitem':'',
                                            createPost === true && item.nameitem ==='Create' ? 'onClickitem':''
                                        )} 
                                            key={index} 
                                            onClick= {
                                            ()=>{
                                                switch(item.nameitem){
                                                    case 'Search':{
                                                        if(ClickSearch === false){
                                                            setClickSearch(true)
                                                            setClickNoti(false)
                                                        }
                                                        else{
                                                            setClickSearch(false)
                                                        }
                                                        break;
                                                    }
                                                    case 'Notification' :{
                                                        if(ClickNoti === false){
                                                            setClickNoti(true)
                                                            setClickSearch(false)
                                                        }
                                                        else{
                                                            setClickNoti(false)
                                                        }
                                                        break;
                                                    }
                                                    case 'Create':{
                                                        setCreatePost(!createPost)
                                                    }
                                                    default:
                                                        setClickNoti(false)
                                                        setClickSearch(false)
                                                }
                                            }
                                        }>
                                            <a className={cx('container-list-item-link')} href={item.link}>
                                                <div className={cx('ChangeSize31px',)}>
                                                    <FontAwesomeIcon icon={item.iconitem} className={cx('container-list-item-icon')} />
                                                </div>
                                                <h2 className={
                                                    cx('container-list-item-text' , 
                                                    ClickSearch === true || ClickNoti===true || clickMessage === true ? 'hidden' :'')                               
                                                }>
                                                    {item.nameitem}
                                                </h2>
                                            </a>
                                        </li>
                                    );
                                })}
                                {/* Avatar */}
                                <li className={cx('container-list-item')}>
                                    <a className={cx('container-list-item-link')} href={"/profile/"  + user?.username}>
                                        <div className={cx('avatar')}>
                                            <Imgs 
                                                src={imageUser === "" || imageUser === null ? image.noAvatar : imageUser} 
                                                alt={"AvatarProfile"} className={cx('AvatarProfile')} />
                                        </div>
                                        <h2 className={
                                            cx('container-list-item-text', 
                                                ClickSearch === true || ClickNoti === true || clickMessage === true ? 'hidden' :'' )
                                            }
                                        >
                                            Profile
                                        </h2>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* Side More */}
                        <Menu listmore={listmore}>
                            <div className={
                                cx('Sidebar__more',
                                    ClickSearch === true || ClickNoti === true || clickMessage === true ? 'ChangeSize31px':'')
                                }
                            >
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faBarsStaggered} 
                                    className={cx('icon-class')} />
                                </div>
                                <h2 className={cx('text', 
                                            ClickSearch === true || ClickNoti === true || clickMessage === true  ? 'hidden' :'' )}>
                                    More
                                </h2>
                            </div>
                        </Menu>
                       
                    </div> 
                    <SearchUI display = {ClickSearch === true ? 'flex' : 'none'}></SearchUI>
                    <Notifi display = {ClickNoti === true ? 'block' : 'none'}></Notifi>
                </div>
                <UploadPost stateComponent ={createPost} setstateCompoment={setCreatePost} ></UploadPost> 
            </>
    );
}

export default Sidebar;
