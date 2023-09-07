import classNames from "classnames/bind";
import style from "./LoginStyle.module.scss";
import { FooterLayOut } from "~/Components/Layout/DefaultLayout/Footer";
import  image from "~/Assets/img/index.js";
import {Imgs} from "~/Components/Image/index.js";
// import { faFacebook } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "~/Components/Layout/DefaultLayout/Form/index.js";

const cx = classNames.bind(style);

function Login() {
    return (
    <div className={cx('login')}>
        <div className={cx('login__wrapper')}>
            <div className={cx('login__main')}>
                <div className={cx('login__left')}>
                    <Imgs className = {cx('logoInstagram')} src = {image.logoInstagram}></Imgs>
                </div>
                <div className={cx('login__right')}>
                    {/* Form sign in */}
                    <Form></Form>
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