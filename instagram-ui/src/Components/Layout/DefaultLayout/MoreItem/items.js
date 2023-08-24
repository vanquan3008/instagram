import classNames from "classnames/bind";
import style from "./moreitem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

function Stingitem({icon , text , hidden , linkitem ,onclick ,inputs}) {
    return (
    <div className={cx('More-item')} onClick={onclick} >
        <a href= {linkitem} className={cx('link')}> 
            <div className={cx('item', hidden && 'hidden')}>
                <FontAwesomeIcon  className={cx('icon')} icon = {icon || faExclamation }></FontAwesomeIcon>
            </div>
            <h2 className={cx('text')}> {text} </h2>
            <input className={cx('input' , inputs === 'true' ? 'unhidden':'hidden')} ></input>
        </a>
    </div>  
    );
}

export default Stingitem;