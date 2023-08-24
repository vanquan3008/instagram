import {useState , forwardRef } from 'react';
import classNames from 'classnames';
import image from '~/Assets/img/index.js';
import styles from './imageStyle.module.scss'

const Imgs = forwardRef(({ src , ref , classname , ...props},alt)=>{
    const [fallback,setFallback] = useState('')
    const handleError = ()=>{
        setFallback (image.noImage);
    }
    return(
        // eslint-disable-next-line
        <img className={classNames(styles.wrapper || classname)} 
            ref={ref} 
            {...props} 
            alt = {alt} 
            src ={fallback || src} 
            onError={handleError}
        />
    );
})



export default Imgs;