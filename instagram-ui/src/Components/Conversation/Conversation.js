import classNames from "classnames/bind";
import style from "./conversationStyle.module.scss";
import axios from "axios";

import { format } from "timeago.js";

import image from "~/Assets/img";
import { AvatarImg } from "../AvatarImg";
import { useState ,useEffect } from "react";



const cx = classNames.bind(style);
function Conversation({conversation , currentuser , userOnline}) {
    const [user , setUser] = useState(null);
    const [lastMessage,setLastMessage] = useState(null);
    useEffect(() => {
        const getListFriend= async ()=>{ 
            try{
                const friendID = conversation.members.find(m => m !== currentuser._id)
                const infoFriend = await axios.get("http://localhost:3000/auth/find/" + friendID)
                setUser(infoFriend.data)
            }   
            catch(e){
                console.log(e);
            }
        }
        getListFriend()
    },[currentuser , conversation])

    useEffect(()=>{
        const getLastMessage = async ()=>{ 
            try{
                if(conversation){
                    const getlistMess = await axios.get("http://localhost:3000/message/" + conversation._id);
                    setLastMessage(getlistMess.data[getlistMess.data.length - 1]);
                }
            }
            catch(e){
                console.log("Error getting last message")
            }
        }
        getLastMessage();
    },[conversation])


    return ( 
        <div className={cx('conversation')}>
            <div className={cx('conversation__avatar')}>
                <AvatarImg className={cx('image')}
                    img = {user?.profilePicture === "" ? image.noAvatar : user?.profilePicture}
                    size={'big'}
                    story={'no'}
                    online = {(userOnline.find(m => m.userId === user?._id))? true : false}
                >
                </AvatarImg>
            </div>
            <div className={cx('coversation__main')}>
                <span className={cx('conversation__main-username')}>
                    {user?.username}
                </span>
                <div className={cx('conversation__main-space')}></div>
                    <div className={cx('conversation__main-lastmessage')}>
                        <div className={cx('text__message')}>
                            {lastMessage?.senderID === currentuser._id ? 'You : '+ lastMessage?.text : lastMessage?.text}
                        </div>
                        <span>·</span>
                    <div className={cx('time')}>{format(lastMessage?.createdAt)}</div>
                </div>    
            </div>
        </div>
    );
}

export default Conversation;
