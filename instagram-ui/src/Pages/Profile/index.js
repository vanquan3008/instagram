import classNames from "classnames/bind";
import style from './ProfileStyle.module.scss';

import { FooterLayOut } from "~/Components/Layout/DefaultLayout/Footer";
import { Imgs } from "~/Components/Image";
const cx = classNames.bind(style);

function Profile() {
    return ( 
        <section>
            <main className={cx('main')}>
                <div className={cx('header')}>
                    <div className={cx('avatar')}>
                        <button className={cx('avatar-upload-btn')}>
                            <Imgs className ={cx('avatar-img')} ></Imgs>
                        </button>
                    </div>
                    <div className={cx('info-user')}>
                        <div className={cx('')}>

                        </div>
                    </div>

                </div>
            </main>
            <FooterLayOut></FooterLayOut>

        </section>

    );
}

export default Profile;