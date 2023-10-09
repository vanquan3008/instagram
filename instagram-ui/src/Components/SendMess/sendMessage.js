import classNames from "classnames/bind";
import style from "./sendMessage.module.scss";
import { AvatarImg } from "../AvatarImg";
import { format } from "timeago.js";

const cx = classNames.bind(style)


function SendMessage({own , message}) {
    return ( 
        <div className={cx("chat")}>
            <div className={cx(own === true ? 'currentuser': 'user' )}>
                <div className={cx('chat-body')}>
                    {
                        own === false ? 
                        <div className={cx('image__user')}>
                            <AvatarImg size={'small'} ></AvatarImg>
                        </div>
                         : <></>
                    }
                    <div className={cx('chat__sendtext')}>
                        {message.text}
                    </div> 
                </div>
                <time className={cx('time-chat')}>
                    {format(message.createdAt)}
                </time>
            </div>
        </div>
    );
}

export default SendMessage;