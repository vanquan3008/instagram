import classNames from "classnames/bind";
import styles from './infoStyle.module.scss'
import image from '~/Assets/img'
import { Imgs } from '~/Components/Image/index.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Button } from "~/Components/Button/index.js";

import { AvatarImg } from "~/Components/AvatarImg/index.js";

const cx = classNames.bind(styles)

function InfoGeneral({
    href,
    buttontype,
    namebutton,
    value,imags,
    story = 'yes',
    hoverelement = 'yes',
    nopadding = 'no'
}) {
    return (
        <div className={cx('Wrapper',
                    hoverelement ==='no' ? 'nohover':'',
                    nopadding ==='yes' ? 'nopadding':''
                )}>
            <a className={cx('account')} href={href}>
                <div className={cx('Marginright14px')}>
                    <AvatarImg img = {value.image}
                        story={story}
                    />
                </div>
                <div className={cx('info')}>
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
                <div className={
                    cx('followingorSwitch' , 
                        (buttontype !== 'following' && 'hidden')&& (buttontype !== 'switch' && 'hidden')
                    )
                }>
                    {namebutton}
                </div>
                <div className={cx('close',buttontype !== 'close' && 'hidden')}>
                    <FontAwesomeIcon className={cx('iconclose')} icon = {faClose} />
                </div>

                <Button type ={buttontype} 
                        primary={namebutton === 'Follow' ? 'Blue' : 'defaultButton'}
                > 
                    {namebutton}
                </Button>

                <div className={cx('image',buttontype !== 'image' && 'hidden')}>
                   <Imgs className={cx('imgnofi')} 
                         src = {imags || image.noImage}
                    ></Imgs>
                </div>
            </a>
        </div>  
    );
}

export default InfoGeneral;