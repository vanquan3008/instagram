import classNames from "classnames/bind";
import style from "./RegisterStyle.module.scss";
import { FooterLayOut } from "~/Components/Layout/DefaultLayout/Footer";
import  image from "~/Assets/img/index.js";
import {Imgs} from "~/Components/Image/index.js";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const cx = classNames.bind(style);
function Register() {
    return ( 
        <div className={cx('register')}>
            <div className={cx('main_register')}>
                <form className={cx('main')}>
                    <Imgs src={image.logo} className={cx('login__logo')}></Imgs>
                    <div className={cx('login__form')}>
                        <input 
                            required
                            type="text" 
                            className={cx('input__user')}
                            placeholder="Phone number,username or email" 
                        ></input>
                        <input 
                            type="password"
                            required
                            minLength={6}
                            className={cx('input__password')}
                            placeholder="Password" 
                        ></input>
                        <input
                            type="password"
                            required
                            minLength={6}
                            className={cx('input__reloadpassword')}
                            placeholder="Password" 
                        ></input>
                        <button className={cx('login__btn')}>
                            Register
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
                    <div className={cx('reload__login')}>
                        <a 
                            href="/login" 
                            className={cx('reload__login--link')}
                        >Back to login</a>
                    </div>
                </form>
            </div>
            <div className={cx('main_footer')}>
                <FooterLayOut></FooterLayOut>
            </div>
        </div>
     );
}

export default Register;