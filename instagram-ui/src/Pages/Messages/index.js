import classNames from "classnames/bind";
import styles from "./MessageStyle.module.scss"

import { Imgs } from "~/Components/Image";
import image from "~/Assets/img";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown} from "@fortawesome/free-solid-svg-icons";
import { DefaultLayout } from "~/Components/Layout";

const cx = classNames.bind(styles)

function Messages() {
    return (
       <DefaultLayout>
            <main className={cx('messages')}>
                <div className={cx('messages-navigation')}>
                    <div className={cx('user')}>
                        <div className={cx('user-name')}>
                            <span>vanquan_12</span>
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
                            <a className={cx('request-link')}
                               href="/">
                                Requests
                            </a>
                        </div>
                    </div>
                    <div className={cx('list-messagesfriend')}>
                        <ul>
                            {/* List friend */}
                        </ul>
                    </div>
                </div>
                <div className={cx('messages-main')}>
        
                </div>
            </main>
       </DefaultLayout>
    );
}

export default Messages;