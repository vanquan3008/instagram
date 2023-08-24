import style from './Stylenoti.module.scss'
import classNames from 'classnames/bind';

import InfoGeneral from '../Iginfo/info';
import {ListNoti} from './listnotifi.js';

const cx = classNames.bind(style)
function Notifi({display}) {

    const renderListNoti = ListNoti.map(
        (value,index)=>{
            return (
                <div className={cx('Contents')} 
                    key={index}
                    >
                    <div className={cx('time')}>
                        <span>  
                            {value.time}
                        </span>
                    </div>
                    <div className={cx('Noti-Contents')}>
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
            
            <div className={cx('Title')}>
                <span>Notification</span>
            
            </div>
            <div className={cx('Contents')}>
                {renderListNoti}
            </div>

        </div>
    );
}

export default Notifi;