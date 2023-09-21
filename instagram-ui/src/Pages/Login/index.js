import classNames from "classnames/bind";
import style from "./LoginStyle.module.scss";


import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

import  image from "~/Assets/img/index.js";
import {Imgs} from "~/Components/Image/index.js";
import { FooterLayOut } from "~/Components/Layout/DefaultLayout/Footer";
import {loginUser} from "../../CallAPI/callApi.js";
import { useSelector } from "react-redux";


const cx = classNames.bind(style);


function Login() {
    //Create a vaiable
    const [username , setusername] =useState("");
    const [password , setpassword] =useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorlogin = useSelector((state) => state.auth.login.error);
    // const usercurrent = useSelector((state) => state.auth.login.currrentUser);

    // useEffect(()=>{
    //     if(usercurrent){
    //         localStorage.setItem("user", JSON.stringify(usercurrent))
    //     }
    // },[usercurrent])



    //Function handler 
    const handlesubmit = (e)=>{
        const user = {
            username:username,
            password:password,
        }
        loginUser(user,dispatch,navigate);
    }


    return (
    <div className={cx('login')}>
        <div className={cx('login__wrapper')}>
            <div className={cx('login__main')}>
                <div className={cx('login__left')}>
                    <Imgs className = {cx('logoInstagram')} src = {image.logoInstagram}></Imgs>
                </div>
                <div className={cx('login__right')}>  
                    {/* Form sign in */}
                    <form  className={cx('main')}
                            onSubmit={handlesubmit}>
                        <Imgs src={image.logo} className={cx('login__logo')}></Imgs>
                        <div className={cx('login__form')}>
                            <input 
                                required
                                type="text" 
                                className={cx('input__user')}
                                placeholder="Phone number,username" 
                                onChange={(e)=>{
                                    setusername(e.target.value)
                                }}
                            ></input>
                            <input 
                                type="password"
                                required
                                minLength={6}
                                className={cx('input__password')}
                                placeholder="Password" 
                                onChange = {
                                    (e)=>{
                                        setpassword(e.target.value)
                                    }
                                }
                            ></input>
                            <span className={cx('text-checkpassword',errorlogin ? '':'hidden')} >
                                Sorry, your password was incorrect. Please double-check your password.
                            </span>
                            <button className={cx('login__btn')}>
                                Login
                            </button>
                        </div>
                        <div className={cx('login__line')}>
                            <div className={cx('line_1')}></div>
                            <div className={cx('text__line')}>OR</div>
                            <div className={cx('line_2')}></div>
                        </div>
                        <div className={cx('login__facebook')}>
                            <a href="/" className={cx('login__facebook--link')}>
                                <FontAwesomeIcon icon={faFacebook} style={{color: "#3f84de", marginRight : "8px"}} />
                                <span className={cx('login__facebook--text')}>Login with facebook</span>
                            </a>
                        </div>
                        <div className={cx('login__forget')}>
                            <a 
                                href="/" 
                                className={cx('login__forgot--link')}
                            >Forgot password?</a>
                        </div>
                    </form>
                    {/* Link register */}
                    <div className={cx('login__singup')}>
                       <div className={cx('login__singup--text')}>
                            Don't have an account?
                            <a  className={cx('login__singup--link')} 
                                href="/register">
                                    Sign up
                            </a>
                       </div>
                    </div>

                    <div className={cx('login__footer')}>
                        <div className={cx('footer__title')}>
                            <p>Get the app</p>
                        </div>
                        <div className={cx('logo_brand')}>
                            <a className={cx('logo')}
                                href="/"
                            >
                                 <Imgs  className={cx('iconbrand')} 
                                        src = "https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"></Imgs>
                            </a>
                            <a className={cx('logo')}
                                href="/">
                                <Imgs   className={cx('iconbrand')} 
                                        src = "https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"></Imgs>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <FooterLayOut className ={cx('footer__main')} />
        </div>
    </div>
    );
}

export default Login ;