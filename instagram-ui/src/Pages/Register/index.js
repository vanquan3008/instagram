import classNames from "classnames/bind";
import style from './RegisterStyle.module.scss';


import { Form } from "~/Components/Layout/DefaultLayout/Form";
import { FooterLayOut } from "~/Components/Layout/DefaultLayout/Footer";


const cx = classNames.bind(style);
function Register() {
    return ( 
        <div className={cx('register')}>
            <div className={cx('main')}>
                <Form type = 'Register'></Form>
            </div>
            <div className={cx('main_footer')}>
                <FooterLayOut></FooterLayOut>
            </div>
        </div>
     );
}

export default Register;