import classNames from "classnames/bind";
import style from './imgStoryStyle.module.scss'
import { AvatarImg } from "~/Components/AvatarImg";
import React from 'react';
const cx = classNames.bind(style)
function ImgStory({info}) {
    return ( 
    <a href="/" className= {cx('imgStory')}>
        <div className={cx('image_i')}>
            <AvatarImg img = {info.imagestory } size={'big'}></AvatarImg>
        </div>
        <div className={cx('userStory')}>{info.username}</div>
    </a>
    );
}

export default ImgStory;