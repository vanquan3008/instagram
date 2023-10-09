import classNames from "classnames/bind";
import style from './FooterStyle.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
 
const cx = classNames.bind(style);

function FooterLayOut() {
    return ( 
        <footer className={cx('footer')}>
            <div className={cx('footer1')}>
                <ul className={cx('listfooter')}>
                    <li className={cx('item')}>
                        <a href="/">About</a>
                    </li>
                    <li className={cx('item')}>
                        <a href="/">Help</a>
                    </li>
                    <li className={cx('item')}>
                        <a href="/">Press</a>
                    </li>
                    <li className={cx('item')}>
                        <a href="/">API</a>
                    </li>
                    <li className={cx('item')}>
                        <a href="/">Jobs</a>
                    </li>
                    <li className={cx('item')}>
                        <a href="/">Privacy</a>
                    </li>
                    <li className={cx('item')}>
                        <a href="/">Terms</a>
                    </li>
                    <li className={cx('item')}>
                        <a href="/">Locations</a>
                    </li>
                    <li className={cx('item')}>
                        <a href="/">Languages</a>
                    </li>
                    <li className={cx('item')}>
                        <a href="/">Meta Verified</a>
                    </li>
                </ul>
            </div>
            <div className={cx('footer2')}>
                <div className={cx('language')}>
                    English 
                    <FontAwesomeIcon icon ={faChevronDown}></FontAwesomeIcon>
                </div>
                <span>@ 2023 Instagram from Meta</span>
            </div>
        </footer>
    );
}

export default FooterLayOut;