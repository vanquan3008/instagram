import style from './Stylenoti.module.scss'
import classNames from 'classnames/bind';

import InfoGeneral from '../Iginfo/info';
import {ListNoti} from './listnotifi.js';

const cx = classNames.bind(style)
function Notifi({display}) {

    const renderListNoti = ListNoti.map(
        (value,index)=>{
            return (
                <div className={cx('contents')} 
                    key={index}
                    >
                    <div className={cx('time')}>
                        <span>  
                            {value.time}
                        </span>
                    </div>
                    <div className={cx('noti-contents')}>
                    {
                        value.data.map(
                            (values,index)=>{
                                return(
                                <InfoGeneral 
                                    key={index} 
                                    value={values} 
                                    buttontype={values.buttontype} 
                                    namebutton={values.namebutton}
                                    imags={values.imgStory}
                                >
                                </InfoGeneral>
                                )}
                            )
                    }
                    </div>

                </div>
            )
        }
    )

    return (  
        <div className={cx('wrapper')}  
            style={{display : display}}
        > 
            
            <div className={cx('title')}>
                <span>Notification</span>
            
            </div>
            <div className={cx('contents')}>
                {renderListNoti}
            </div>

        </div>
    );
}

export default Notifi;