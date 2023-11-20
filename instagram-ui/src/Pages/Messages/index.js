import classNames from "classnames/bind";
import styles from "./MessageStyle.module.scss"

import { Imgs } from "~/Components/Image";
import image from "~/Assets/img";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown} from "@fortawesome/free-solid-svg-icons";
import { DefaultLayout } from "~/Components/Layout";

import { icons } from "~/Assets/icons";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {io} from 'socket.io-client';
import axios from "axios";

import { Conversation } from "~/Components/Conversation";
import ChatBox from "~/Components/ChatBox/chatBox";
import { NewConversation } from "~/Components/NewConversation";
//import { useParams } from "react-router-dom";

const cx = classNames.bind(styles)

function Messages() {
    const [conversations , setconversations] = useState([])
    const [currentChat , setCurrentChat] = useState(null)
    const [curretUserChat , setCurretUserChat] = useState(null)
    const [userOnline , setUserOnline] = useState([])
    const [sendMessage ,setSendMessage] = useState(null);
    const [recieverMessage ,setRecieverMessage] = useState(null)
    const [createConservation,setcreateConservation] = useState(false)
    const currentuser = useSelector((state)=>state.auth.login.currentUser);
    
    // const idParamChat = useParams().userid;
    //Socket
    const socket = useRef();
    useEffect(()=>{
        socket.current = io('http://localhost:8900');
    },[]);

    useEffect(()=>{
        socket.current.emit("addNewuser" , currentuser._id);
        socket.current.on("getusers" ,(users)=>{
            setUserOnline(users)
        })
    },[currentuser])
    //Send and receive messages
    useEffect(()=>{
        if(sendMessage !== null){
            socket.current.emit('send-message', sendMessage);
        }
    },[sendMessage])

    useEffect(() => {
        socket.current.on("reciever-message", (data) => {
          setRecieverMessage(data);
        });
    }, []);



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
    },[currentuser,createConservation])

    //Get user chat with current user
    useEffect(()=>{ 
        const getUserChat = async ()=>{
            try{ 
                const friendID = currentChat?.members.find(m => m !== currentuser?._id);
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


    //Click create a new mess
    const clickNewMessage = ()=>{
        setcreateConservation(true);
    }


    return (
       <>
           <DefaultLayout type ={'Message'}>
                <main className={cx('messages')}>
                    <div className={cx('messages-navigation')}>
                        <div className={cx('user')}>
                            <div className={cx('user-name')}>
                                <span>{currentuser?.username}</span>
                                <FontAwesomeIcon className={cx('icon-down')} icon= {faAngleDown}></FontAwesomeIcon>
                            </div>
                            <div className={cx('user-newmessages')}>
                                <Imgs className={cx('newmessages-logo')}
                                      src={image.logoNewMess}
                                      onClick={clickNewMessage}
                                ></Imgs>
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
                                            userOnline={userOnline}
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
                                            <button className={cx('button')} onClick={clickNewMessage}>
                                                Send message
                                            </button>
                                    </div>
                                </div> : <>
                                    {
                                         <ChatBox userChat={curretUserChat} 
                                                  userCurrent ={currentuser._id}
                                                  chatID = {currentChat._id}
                                                  setSendMessage = {setSendMessage}
                                                  recieverMessage={recieverMessage}
                                        ></ChatBox>
                                    }
                                
                                </>
                        }
    
                    </div>
                </main>
           </DefaultLayout>
           <NewConversation hidden={createConservation} 
                            setCreateMessage={setcreateConservation}
                            setCurrentChat={setCurrentChat}
           ></NewConversation>
       </>
    );
}

export default Messages;