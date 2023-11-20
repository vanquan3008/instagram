import classNames from "classnames/bind";
import style from "./userFollowing.module.scss";

import { AvatarImg } from "../AvatarImg";
import image from "~/Assets/img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleRight, faClose } from "@fortawesome/free-solid-svg-icons";

import { Imgs } from "../Image";
import { icons } from "~/Assets/icons";
import { unfollowFunction } from "~/CallAPI/authApi";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(style)

function UserFollowing({userCurrrentProfile , defaulhidden , sethiddentable}) {
    const ref = useRef()
    const dispatch = useDispatch()
    const userCurrent = useSelector((state)=>state.auth.login.currentUser);

    const unfollowUser = async(e) =>{
        e.preventDefault();
        unfollowFunction(userCurrrentProfile._id,userCurrent,dispatch)
        sethiddentable(true)
    }

    return (
       <div className={cx('main', defaulhidden=== false ? '' : 'hidden' )}
       ref={ref}
       onClick={(e)=>{
            if(e.target === ref.current){
                sethiddentable(true);
            }
        }}
       >
            <div className={cx('userfollowing')}>
                <div className={cx('titles')}>
                    <div className={cx('user__current')}>
                        <AvatarImg img ={userCurrrentProfile.profilePicture===""?image.noAvatar : userCurrrentProfile.profilePicture}
                                   story={'no'}
                                   size={'big'}
                        ></AvatarImg>
                        <span className={cx('user__username')}>
                            {userCurrrentProfile.username}
                        </span>
                    </div>
                    <div className={cx('close')}
                         onClick={()=>{
                            sethiddentable(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faClose}
                                className={cx('close-icon')}                
                        ></FontAwesomeIcon>
                    </div>
                </div>
                {/* List custom */}
                <div className={cx('body')}>
                    <ul className={cx('list')}>
                        <li className={cx('list__item')}>
                            {
                               
                                <>
                                    <div className={cx('list__item--text')}>
                                        Add to close friends list
                                    </div>
                                    <div className={cx('list__item--box' , 'border__cover')}>
                                        <Imgs className={cx('list__item--itembox')} src={icons.iconAddFriendsList}></Imgs>
                                    </div>
                                </>
                                // :<>
                                //     <div className={cx('list__item--text')}>
                                //         Close Friend
                                //     </div>
                                //     <div className={cx('list__item--box')}>
                                //         <Imgs className={cx('list__item--itembox' , 'onClick')} src={icons.iconCloseFriend}></Imgs>
                                //     </div>
                                // </>
                            }
                        </li>
                        <li className={cx('list__item')}>
                            <div className={cx('list__item--text')}>
                                Add to favorites
                            </div>
                            <Imgs className={cx('list__item--item')} src={icons.iconAddBestFriend}></Imgs>
                        </li>
                        <li className={cx('list__item')}>
                            <div className={cx('list__item--text')}>
                                Mute
                            </div>
                            <FontAwesomeIcon className={cx('list__item--item')} icon={faAngleRight}></FontAwesomeIcon>
                        </li>
                        <li className={cx('list__item')}>
                            <div className={cx('list__item--text')}>
                                Retrict
                            </div>
                            <FontAwesomeIcon className={cx('list__item--item')} icon={faAngleRight}></FontAwesomeIcon>
                        </li>
                        <li className={cx('list__item')} onClick={unfollowUser}>
                            <div className={cx('list__item--text')}>
                                Unfollow
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
       </div>
    );
}

export default UserFollowing;