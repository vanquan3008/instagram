import styles from './SlideStyle.module.scss'
import classNames  from 'classnames/bind';
import {  faCircleLeft, faCircleRight, faVolumeHigh, faVolumeXmark}from "@fortawesome/free-solid-svg-icons";
import { useRef,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { Imgs } from '~/Components/Image';
function getFileExtension(filename){
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
}
const cx = classNames.bind(styles)
//Ham chinh
function SlidesArticle({Article_ImgsorVideo}) {
    const [Muted, setMuted] = useState(false)
    const [active,setactive] = useState(0);
    const ref = useRef();
    const dots = []
    const ContentNumber = Article_ImgsorVideo.length
   
    //Create dots 
    for(var index=0;index < ContentNumber;index++){
        dots.push(
            <li key= {index} className={cx('dot',index === active ?'active':'')}></li>
        )
    }

    const renderImgorVideo = Article_ImgsorVideo.map(
        (value,index) =>{
        return(
        <article className={cx('Content_Post')} key={index}>
            {/* Nếu source là img */}
            <Imgs  
                className={cx('Image_Post', getFileExtension(value.src) ==="mp4" && 'hidden')} 
                src = {getFileExtension(value.src) !=="mp4" ? value.src : undefined}>
            </Imgs>

            {/* Nếu source là video */}
           <div className={cx('Video',
                            getFileExtension(value.src) !=="mp4" && 'hidden')}>
                <video  className={cx('Video_Post')}
                        ref={ref} 
                        autoPlay
                        loop
                        muted={!Muted}
                >
                    <source src={getFileExtension(value.src) ==="mp4" ? value.src : undefined}
                            type={"video/mp4"}
                    >  
                    </source>
                </video>
                <button className={cx('Muled')} 
                        onClick={()=>setMuted(!Muted)}
                >
                    <FontAwesomeIcon icon = {Muted === false ? faVolumeXmark : faVolumeHigh}></FontAwesomeIcon>
                </button>
           </div>
        </article>
        );
        }
    )
    return (
    <div className={cx('Main_Post')}>
        <div className={cx('Wrapper')}>
            {renderImgorVideo[active]}
        </div>
        <div className={cx('Button')}>
            <div className={cx('Left')}>
                <FontAwesomeIcon 
                    className={cx('iconButton', active>0 ? '': 'hidden')} 
                    icon= {faCircleLeft}
                    onClick={()=>{
                        if(active > 0){
                            setactive(active-1)
                        }
                    }}
                ></FontAwesomeIcon>
            </div>
            <div className={cx('Right')}>
                <FontAwesomeIcon className={cx('iconButton', active<ContentNumber-1 ? '' :'hidden')} 
                                 icon= {faCircleRight}
                                 onClick={()=>{
                                    if(active < ContentNumber){
                                        setactive(active+1)
                                    }
                                }
                }
                ></FontAwesomeIcon>
            </div>
        </div>
        <ul className={cx('dots')}>
            {dots}
        </ul>
    </div>
    
    );
}

export default SlidesArticle;