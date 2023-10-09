import classNames from "classnames/bind";
import style from "./conversationStyle.module.scss";
import image from "~/Assets/img";
import { AvatarImg } from "../AvatarImg";
 import { useState ,useEffect } from "react";
import axios from "axios";

const cx = classNames.bind(style);
function Conversation({conversation , currentuser}) {
    const [user , setUser] = useState(null);
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


    return ( 
       
        <div className={cx('conversation')}>
            <div className={cx('conversation__avatar')}>
                <AvatarImg className={cx('image')}
                      src = {user?.image ? user.image : image.noAvatar}
                      size={'big'}
                      story={'no'}
                   >
                </AvatarImg>
            </div>
            <div className={cx('coversation__main')}>
                    <span className={cx('conversation__main-username')}>
                        {user?.username}
                    </span>
                    <div className={cx('conversation__main-space')}></div>
                    <div className={cx('conversation__main-lastmessage')}>
                        Xíu về đi chơi
                        <span>·</span>
                        5d
                    </div>
                </div>
    
            </div>
    );
}

export default Conversation;
