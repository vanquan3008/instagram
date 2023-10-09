import Sidebar from '~/Components/Layout/DefaultLayout/Sidebar/index.js'
import classNames from 'classnames/bind';
import styles from './defaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children ,type }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar type = {type} />
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
