import classNames from "classnames/bind";
import styles from "./MessageStyle.module.scss"

import { Imgs } from "~/Components/Image";
import image from "~/Assets/img";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown} from "@fortawesome/free-solid-svg-icons";
import { DefaultLayout } from "~/Components/Layout";
//import { Conversation } from "~/Components/Conversation";

import { icons } from "~/Assets/icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Conversation } from "~/Components/Conversation";
import ChatBox from "~/Components/ChatBox/chatBox";

const cx = classNames.bind(styles)
// const userchat = 
//     {
//         username : 'Quân',
//     }

function Messages() {
    const [conversations , setconversations] = useState([])
    const [currentChat , setCurrentChat] = useState(null)
    const [curretUserChat , setCurretUserChat] = useState(null)
    const currentuser = useSelector((state)=>state.auth.login.currentUser);
    //Get conversation
    useEffect(() =>{
        const getConversation = async() =>{
            try{
                const conversation = await axios.get("http://localhost:3000/conversation/" + currentuser._id);
                setconversations(conversation.data);
            }
            catch(e){
                console.log(e)
            }
        }
        getConversation()
    },[currentuser])

    //Get user chat with current user
    useEffect(()=>{ 
        const getUserChat = async ()=>{
            try{ 
                const friendID = currentChat?.members.find(m => m !== currentuser._id);
                if(friendID){
                    const infoFriend = await axios.get("http://localhost:3000/auth/find/" + friendID);
                    setCurretUserChat(infoFriend.data);
                }
                else{
                    console.log("ERROR")
                }
               
            }   
            catch(e){
                console.log(e)
            }
        }
        getUserChat()
    },[currentChat , currentuser])



    return (
       <DefaultLayout type ={'Message'}>
            <main className={cx('messages')}>
                <div className={cx('messages-navigation')}>
                    <div className={cx('user')}>
                        <div className={cx('user-name')}>
                            <span>{currentuser.username}</span>
                            <FontAwesomeIcon className={cx('icon-down')} icon= {faAngleDown}></FontAwesomeIcon>
                        </div>
                        <div className={cx('user-newmessages')}>
                            <Imgs className={cx('newmessages-logo')} src={image.logoNewMess}></Imgs>
                        </div>
                    </div>
                    <div className={cx('title')}>
                        <div className={cx('title-messages')}>
                            <span>Messages</span>
                        </div>     
                        <div className={cx('request')}> 
                            <a className={cx('request--link')}
                               href="/">
                                Requests
                            </a>
                        </div>
                    </div>
                    <div className={cx('messagesfriend')}>
                        {/* List friend list */}
                        <ul className={cx('messagesfriend__list')}>{
                            conversations.map((conversation, index)=>(
                                <li className={cx('messgaefriend__item')} 
                                    onClick={()=>setCurrentChat(conversation)}>
                                    <Conversation 
                                        key={index}
                                        conversation={conversation} 
                                        currentuser={currentuser}
                                    ></Conversation>
                                </li>
                            
                            ))
                            }
                        </ul>
                    </div>
                </div>
                <div className={cx('messages-main')}>
                    {/* Don't not click element */}
                    {
                        (!currentChat)?<div className={cx('main--noclick')}>
                                <div className={cx('icon-message')}>
                                    <Imgs className={cx('icon-message--src')} src={icons.iconmessage}></Imgs>
                                </div>
                                <h1 className={cx('title')}>
                                    Your message
                                </h1>
                                <span className={cx('noti')}>
                                    Send private photos and messages to a friend or group
                                </span>
                                <div className={cx('message__send--button')}>
                                        <button className={cx('button')}>
                                            Send message
                                        </button>
                                </div>
                            </div> : <>
                                {
                                     <ChatBox userChat={curretUserChat} 
                                              userCurrent ={currentuser._id}
                                              chatID = {currentChat._id}
                                    ></ChatBox>
                                }
                            
                            </>
                    }

                </div>
            </main>
       </DefaultLayout>
    );
}

export default Messages;