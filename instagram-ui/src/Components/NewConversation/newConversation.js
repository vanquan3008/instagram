import classNames from "classnames/bind";
import style from "./newConversation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import InfoGeneral from "../Layout/DefaultLayout/Iginfo/info";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const cx = classNames.bind(style);

function  NewConversation({setCurrentChat,hidden , setCreateMessage}) {
    const currentuser = useSelector((state)=>state.auth.login.currentUser);
    const wrapRef = useRef();
    const searchRef = useRef();
    const [searchInput , setsearchInput] = useState("");
    const [listuserSearch , setlistuserSearch] = useState([]);
    const [checkUser , setcheckUser] = useState(null)

    const changeSearchInput = ()=>{
        setsearchInput(searchRef.current?.value);
    }

    useEffect(()=>{
        setlistuserSearch([]);
        setcheckUser(null);
        searchRef.current.value = null;
    },[hidden])


    useEffect(()=>{
        if(searchInput !== ""){
            const renderSearch = async ()=>{
                const listuser = await axios.get('http://localhost:3000/auth/find/search/?username=' + searchInput)
                setlistuserSearch(listuser.data)
            }
            renderSearch();
        }
        else{
            setlistuserSearch([])
        }
    },[searchInput])

    const createConversation = async ()=>{
        const data = {
            "senderid" : checkUser?._id ,
            "reciverid" : currentuser?._id
        }
        const newMess = await axios.post('http://localhost:3000/conversation', data)
        setCurrentChat(newMess.data)
        setCreateMessage(false);
    }

    return (
       <div className={cx('main',!hidden && 'hidden')}
            ref={wrapRef}
            onClick={(e)=>{
                if(e.target === wrapRef.current){
                    setCreateMessage(false);
                }
            }}
       
       >
            <div className={cx('wrap')}>
                <div className={cx('c-conversation')}>
                    {/* Header */}
                    <div className={cx('header')}>
                        <div className={cx("header__block")}></div>
                        <h1 className={cx('header__title')}>
                            New Message
                        </h1>
                        <div className={cx('header__close')}>
                            <FontAwesomeIcon className={cx('header__close--icon')} 
                                              icon={faClose}
                                              onClick={()=>{setCreateMessage(false)}}
                            ></FontAwesomeIcon>
                        </div>
                    </div>
                    {/* Body */}
                    <div className={cx('body')}>
                        <div className={cx('body-to')}>
                            To : 
                        </div>
                        <input className={cx('body__search')}
                                placeholder="Search..."  
                                ref={searchRef} 
                                onChange={changeSearchInput}
                        ></input>
                    </div>

                    {/* Result - search */}
                    <div className={cx('result-search')}>
                        {
                        listuserSearch.length === 0
                            ?<div className={cx('result-search_none')}>
                                <div className={cx('text')}>No account found.</div>
                            </div>
                            :<ul className={cx('result-search__list')}>
                                {
                                    listuserSearch.map( 
                                        (value,index)=>{
                                            return (
                                            <li className = {cx('result-search__item')}
                                                key={index}
                                            >
                                                <InfoGeneral 
                                                    value={value} 
                                                    story={'no'} 
                                                    nopadding={'yes'}   
                                                    hoverelement={'no'}  
                                                    buttontype={'checkbox'}  
                                                    checkUser={checkUser}
                                                    setcheckUser={setcheckUser}
                                                    unCheckbox ={hidden}     
                                                ></InfoGeneral>
                                            </li>)
                                        }
                                    )
                                }
                            </ul>
                        }

                        <div className={cx('button-chat')}> 
                            <button className ={cx('button-chat__text' , checkUser===null ?  'disable' : '' )}
                                    onClick={createConversation}
                            >Chat</button>
                        </div>
                    </div>

                </div>
            </div>
       </div>
    );
}

export default NewConversation;