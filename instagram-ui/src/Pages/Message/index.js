import classNames from "classnames/bind";
import styles from "./MessageStyle.module.scss"

import { Imgs } from "~/Components/Image";
import image from "~/Assets/img";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Message() {
    return (
    <main className={cx('message')}>
        <div className={cx('message-navigation')}>
            <div className={cx('user')}>
                <div className={cx('user-name')}>
                    <span>vanquan_12</span>
                    <FontAwesomeIcon className={cx('icon-down')} icon= {faAngleDown}></FontAwesomeIcon>
                </div>
                <div className={cx('user-newmessage')}>
                    <Imgs className={cx('newmessage-logo')} src={image.logoNewMess}></Imgs>
                </div>
            </div>
            <div className={cx('title')}>
                <div className={cx('title-message')}>
                    <span>Message</span>
                </div>     
                <div className={cx('request')}> 
                    <a className={cx('request-link')}
                       href="/">
                        Requests
                    </a>
                </div>
            </div>
            <div className={cx('list-messagefriend')}>
                <ul>
                    {/* List friend */}
                </ul>
            </div>
        </div>
        <div className={cx('message-main')}>

        </div>
    </main>
    );
}

export default Message;