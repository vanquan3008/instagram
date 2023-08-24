import classNames from "classnames/bind";
import style from './StyleSetting.module.scss'

const cx = classNames.bind(style);

function MoreWrapper({children}) {
    return (
    <div className={cx('Wrapper')}>
        {children}
    </div>  
    );
}

export default MoreWrapper