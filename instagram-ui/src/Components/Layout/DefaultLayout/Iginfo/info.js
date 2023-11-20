import classNames from "classnames/bind";
import styles from './infoStyle.module.scss'
import image from '~/Assets/img'
import { Imgs } from '~/Components/Image/index.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Button } from "~/Components/Button/index.js";

import { AvatarImg } from "~/Components/AvatarImg/index.js";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles)

function InfoGeneral({
    href,
    imageSize = 'medium',
    buttontype,
    namebutton,
    value,
    imags,
    story = 'yes',
    hoverelement = 'yes',
    nopadding = 'no',
    checkUser,
    setcheckUser,
    unCheckbox
}) {
    const checkRef = useRef();

    function onClicknoEvent(e){
        if(buttontype ==='checkbox'){
            e.preventDefault();
            if(checkUser === null){
                checkRef.current.checked = !checkRef.current.checked;
                setcheckUser(value)
            }
        }
    }

    

    return (
        <div className={cx('Wrapper',
                    hoverelement ==='no' ? 'nohover':'',
                    nopadding ==='yes' ? 'nopadding':''
                )}>
            <a className={cx('account')} href={href} onClick={onClicknoEvent}>
                <div className={cx('Marginright14px')}>
                    <AvatarImg 
                        img = {value.image}
                        story={story}
                        size={imageSize}
                    />
                </div>
                <div className={cx('info' , imageSize = "big" ? 'height--big' :'')}>
                    <a href="/" className={cx('username')}>
                        <a href="/">{value.username}</a>
                        <div className={cx(value.tickblue === true ? 'tick' :'hidden')}>
                            <Imgs className = {cx('tick-icon')} src= {image.tickgreen}></Imgs>
                        </div>
                    </a>

                    <div className={cx('name',!value.name ?'hidden' :'' )}>
                        <span>{value.name}</span>
                    </div>
                    <div className={cx('Suggest' , !value.Suggest ?'hidden' : '')}>
                        <span>{value.Suggest}</span>
                    </div>
                </div>
                {/* Button */}
                {/* Type follow */}
                <div className={
                    cx('followingorSwitch' , 
                        (buttontype !== 'following' && 'hidden')&& (buttontype !== 'switch' && 'hidden')
                    )
                }>
                    {namebutton}
                </div>                
                <Button type ={buttontype} 
                        primary={namebutton === 'Follow' ? 'Blue' : 'defaultButton'}
                > 
                    {namebutton}
                </Button>
                {/* Close */}
                <div className={cx('close',buttontype !== 'close' && 'hidden')}>
                    <FontAwesomeIcon className={cx('iconclose')} icon = {faClose} />
                </div>


                {/* Image */}
                <div className={cx('image',buttontype !== 'image' && 'hidden')}>
                   <Imgs className={cx('imgnofi')} 
                         src = {imags || image.noImage}
                    ></Imgs>
                </div>

                {/* Tick - checkbox */}
                <input
                    className={cx('checkbox', buttontype !== 'checkbox' && 'hidden')}
                    type="checkbox"
                    ref={checkRef}
                    checked={unCheckbox ? undefined  : false}
                >
                </input>

            </a>
        </div>  
    );
}

export default InfoGeneral;