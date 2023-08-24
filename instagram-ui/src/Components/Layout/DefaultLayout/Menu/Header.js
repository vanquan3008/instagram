import styles from './MenuStyle.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSun } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles)
function MenuHeader({title , onBack }) {
    return ( 
    <div className={cx('header_menu')}>
        <button className={cx('icon_btn')} onClick={onBack}>
            <FontAwesomeIcon className={cx('icon-class')} icon ={faChevronLeft}></FontAwesomeIcon>
        </button>
        <h3 className={cx('title')}>{title}</h3>
        <div className={cx('icon_btn_right')}>
            <FontAwesomeIcon  icon = {faSun}></FontAwesomeIcon>
        </div>
    </div> 
    );
}

export default MenuHeader;