import classNames from "classnames/bind";
import style from './ProfileStyle.module.scss';

import { FooterLayOut } from "~/Components/Layout/DefaultLayout/Footer";
import { Imgs } from "~/Components/Image";
import image from "~/Assets/img/index.js";
import { icons } from "~/Assets/icons";
import { DefaultLayout } from "~/Components/Layout";
const cx = classNames.bind(style);

function Profile() {
    return ( 
        <DefaultLayout>
            <div className={cx('register')}>
                <main className={cx('main')}>
                    <div className={cx('header')}>
                        <div className={cx('avatar')}>
                            <button className={cx('avatar__upload--btn')}>
                                <Imgs className ={cx('avatar__img')}  src={image.noImage} ></Imgs>
                            </button>
                        </div>
                        <div className={cx('info__user')}>
                            <div className={cx('info__general')}>
                                <div className={cx('info__name')} >
                                   <a className={cx('info__name--link')} href="/">
                                        vanquan_12
                                    </a>
                                </div>
                                <div className={cx('edit__profile')}>
                                    <a className={cx('edit__profile--link')} href="/">
                                        Edit profile
                                    </a>
                                </div>
                                <div className={cx('settings')}>
                                    <Imgs 
                                        src = {icons.icongear}
                                        className={cx('settings-icon')}
                                    ></Imgs>
                                </div>
    
                            </div>
                            <div className={cx('space_20')}></div>
                            <ul className={cx('info__social')}>
                                <li className={cx('user__post')}>
                                    <span>0</span> post
                                </li>
                                <li className={cx('user__follower')}>
                                    <span>0</span> followers
                                </li>
                                <li className={cx('user__following')}>
                                    <span>0</span> followings
                                </li>
                            </ul>
                            <div className={cx('info__detail')}>
                                <div className={cx('fullname')}>
                                    Văn Quân
                                </div>
                                <div className={cx('description')}>
                                    Hôm nay là một ngày vui
                                </div>
                            </div>
    
                        </div>
                    </div>
                    
                </main>
                <div className={cx('container')}>
                    <div className={cx('item')}>
                        <div className={cx('allpost__icon')}>
                            <Imgs src={icons.iconposts}></Imgs>
                        </div>
                        <span>POSTS</span>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('saves__icon')}>
                            <Imgs src={icons.iconsaved}></Imgs>
                        </div>
                        <span>SAVED</span>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('tagged__icon')}>
                            <Imgs src={icons.icontagged}></Imgs>
                        </div>
                        <span>TAGGED</span>
                    </div>
                    <article className={cx('article')}>
    
                    </article>
    
                </div>
    
                
               <div className={cx('footer__main')}> 
                    <FooterLayOut ></FooterLayOut>
                </div>
    
            </div>
    
        </DefaultLayout>
    );
}

export default Profile;