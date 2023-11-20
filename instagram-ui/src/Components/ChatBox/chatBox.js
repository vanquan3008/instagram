import classNames from "classnames/bind";
import style from "./chatBoxStyle.module.scss"

import InputEmoji from "react-input-emoji";

import { Imgs } from "../Image";
import image from "~/Assets/img";
import { icons } from "~/Assets/icons";
import { AvatarImg } from "../AvatarImg";
import { useEffect, useRef, useState } from "react";
import { SendMessage } from "../SendMess";
import axios from "axios";
const cx = classNames.bind(style);



function ChatBox({userChat , userCurrent ,chatID ,setSendMessage ,recieverMessage}) {
    const scrollEnd = useRef()
    const [text , setText] =  useState("")
    const [messages ,setmessages] = useState([])
    //fetch  message
    useEffect(()=>{
        try{
            const getMessage = async () => {
                const listmessage = await axios.get('http://localhost:3000/message/' + chatID);
                setmessages(listmessage.data)
            }
            getMessage();
        }catch(e){
            console.log(e)
        }
    },[chatID])

    //Scroll
    useEffect(() => {
        scrollEnd.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])


    useEffect(()=>{
        if(recieverMessage !== null  && recieverMessage?.chatID === chatID){
            setmessages(m=>[...m , recieverMessage])
        }
    },[recieverMessage , chatID])

    // Socket
    const senderMessage = async (e)=>{
        //Send server  
        const message = {
            chatID : chatID,
            senderID : userCurrent, 
            text: text
        }
        try{ 
            const newMessage = await axios.post('http://localhost:3000/message', message);
            setmessages([...messages , newMessage.data])
        }
        catch(e){
            console.log(e)
        }
        setSendMessage({...message , recieverId : userChat._id})
    };

    return (
        <div className={cx("chat-box")}>
            {/* Header chat box */}
           <header className={cx("chat-box__header")}>
                <a href={"/profile/"  + userChat?.username} className={cx("header__user")}>
                    <AvatarImg 
                        className ={cx('header__user-img')} 
                        img = {userChat?.profilePicture ? userChat.profilePicture : image.noAvatar}
                        story={"no"}
                    >    
                    </AvatarImg>
                    <div className={cx('header__user-name')}>
                        {userChat?.username}
                    </div>
                </a>
                {/* Call video and vv... */}
                <div className={cx('header__fc-other')}>
                    <div className={cx('header__fc-other--icon')}>
                        <Imgs src={icons.iconCall}></Imgs>
                    </div>
                    <div className={cx('header__fc-other--icon')}>
                        <Imgs src={icons.iconCallVideo}></Imgs>
                    </div>
                    <div className={cx('header__fc-other--icon')}>
                        <Imgs src={icons.iconInfo}></Imgs>
                    </div>
                </div>

           </header>
           {/* Body chat box */}
            <div className={cx("chat-body")}>
                {
                    messages.map(
                        (mess , index) =>{
                            return(
                            <div ref={scrollEnd} key={index}>
                                <SendMessage 
                                    own={mess.senderID === userCurrent ? true : false} 
                                    message = {mess}
                                ></SendMessage>
                           </div>)
                        }
                    )
                }
            </div>

            {/*Chat text */}
            <div className={cx('chat-input')}>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    onEnter={senderMessage}
                    cleanOnEnter
                    placeholder="Type a message"
                    className={cx('chat-input__text')}
                />
                <div className={cx('chat-input__icon',text!== "" ? 'hidden' :'')}>
                    <div className={cx('chat-input__icon-mic')}>
                        <Imgs src = {icons.iconMic}></Imgs>
                    </div>
                    <div className={cx('chat-input__icon-addimg')}>
                        <Imgs src = {icons.iconAddImg}></Imgs>
                    </div>
                    <div className={cx('chat-input__icon-like')}>
                        <Imgs src = {icons.iconLikeHeart}></Imgs>
                    </div>
                </div>
                <div 
                        className={cx('chat-input__send', (text === "") ? 'hidden' :'')} 
                        onClick={senderMessage} 
                >
                    <div className={cx('send__button')}>
                        Send
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;