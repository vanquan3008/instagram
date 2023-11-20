import image from "~/Assets/img";
import classNames from "classnames/bind";
import styles from './avatarStyle.module.scss'
import { Imgs } from "../Image";

const cx = classNames.bind(styles)

function AvatarImg({
        img,
        size = 'medium',
        story,
        online
    }) {
    return ( 
        <div className={cx('img',
                    story ==='no'|| story ==='seen' ? story:'',
                    size)
                }>
            <Imgs className = {cx('avatar')} src={img || image.noAvatar}></Imgs>
            <div className={cx( online === true ?'online' : ' ')}></div>
        </div> 
    );
}

export default AvatarImg;