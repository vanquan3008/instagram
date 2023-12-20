import classNames from "classnames/bind";
import style from "./settingsPostStyle.module.scss"
import { useRef } from "react";



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { unfollowFunction} from "~/CallAPI/authApi";

const cx = classNames.bind(style);


function SettingsPost({hidden ,sethidden , post}){
    const wrapRef = useRef();
    const dispatch = useDispatch();
    const currentuser = useSelector((state)=> state.auth.login.currentUser);
    const DeletePost = async () => {
        try{
            await axios.delete("http://localhost:3000/post/delete/" + post?._id,
               {    
                    data :  {"userId" : currentuser?._id}
                }
            );
            sethidden(false);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }
    
    const DeleteAndReport = async()=>{
        if(currentuser?._id === post?.userId ){
            DeletePost();
        }
        else{
            // Report
        }
    }

    const EditUnfollowandHidden = async(e)=>{
        e.preventDefault();
        if(currentuser?._id === post?.userId ){
            //Edit


        }
        else if(currentuser?.followings.includes(post?.userId)){
            //Unfollow
            unfollowFunction(post?.userId , currentuser, dispatch);
            sethidden(false)
        }
        else{
            //Not interested
        }
    }

    return ( 
        <div className={cx('main' , hidden === false ?'hidden':'' )}
            ref={wrapRef}
            onClick={(e)=>{
                if(e.target === wrapRef.current){
                    sethidden(false)
                }
            }}
        >
            <div className={cx('settings-post')}>
                <div className={cx('settings-post__list')}>
                    <button className={cx('settings-post__item','border-bottom','color-red')}
                            onClick={DeleteAndReport}
                    >
                       {currentuser?._id === post?.userId ? "Delete" : "Report"} 
                    </button>
                    <button className={
                        cx('settings-post__item','border-bottom',currentuser?._id === post?.userId ? '' :'color-red' )
                      }
                      onClick={EditUnfollowandHidden}
                    >
                        {currentuser?._id === post?.userId ?"Edit" :currentuser?.followings.includes(post?.userId) ? "Unfollow" : "Not instersting"}
                    </button>
                    <button className={cx('settings-post__item','border-bottom')}>
                        {currentuser?._id === post?.userId ?"Hide like count" : "Add to Favorites"}
                    </button>
                    <button className={cx('settings-post__item','border-bottom')}>
                       {currentuser?._id === post?.userId ?"Turn off commentting" : "Go to post"}
                    </button>
                    <button className={cx('settings-post__item','border-bottom')}>
                        Share to...
                    </button>
                    <button className={cx('settings-post__item','border-bottom')}>
                        Copy link
                    </button>
                    <button className={cx('settings-post__item','border-bottom')}>
                        Embed
                    </button>
                    <button className={cx('settings-post__item','border-bottom')}>
                        About this account
                    </button>
                    <button className={cx('settings-post__item')}
                            onClick={()=>{
                                sethidden(false);
                            }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            {/* Close */}
            <div className={cx('close')} onClick={()=>{sethidden(false)}}>
                <FontAwesomeIcon className={cx('close__icon')} icon={faClose}></FontAwesomeIcon>
            </div>
        </div> 
    );
}

export default SettingsPost;