import classNames from "classnames/bind";
import style from './FormStyle.module.scss'
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  image from "~/Assets/img/index.js";
import {Imgs} from "~/Components/Image/index.js";

const cx = classNames.bind(style)

function Form({type = 'Login'}) {
    return ( 
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
                className={
                    cx('input__reloadpassword',
                    type === 'Register' ? '' : 'hidden')
                }
                placeholder="Password" 
            ></input>
            <button className={cx('login__btn')}>
                {type === 'Register' ? 'Register' : 'Login'}
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
        <div className={cx('login__forget',type === 'Register' ? 'hidden' : '')}>
            <a 
                href="/" 
                className={cx('login__forgot--link')}
            >Forgot password?</a>
        </div>
        <div className={cx('reload__login',type === 'Register' ?  '' :'hidden')}>
            <a 
                href="/login" 
                className={cx('reload__login--link')}
            >Back to login</a>
        </div>
    </form>
    );
}

export default Form;