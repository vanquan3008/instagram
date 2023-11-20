import classNames from "classnames/bind";
import style from "./uploadPost.module.scss"

import { useEffect, useRef, useState } from "react";


import { Imgs } from "~/Components/Image";
import { icons } from "~/Assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faChevronCircleLeft, faClose, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { SlidesArticle } from "~/Components/Slide";
import { AvatarImg } from "~/Components/AvatarImg";
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from "react-redux";
import axios from "axios";

function getFileExtension(filename){
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
}

const cx = classNames.bind(style)
function UploadPost({stateComponent , setstateCompoment}) {
    const refFile = useRef(null);
    const refWrapper = useRef();
    const formUploadFile =useRef()
    const reftextCaption = useRef("")
    const [fileList, setFileList] = useState([]);
    const [fileformat , setfileformat] = useState([]);
    const [textCaption , settextCaption] = useState("");
    const [clickEmoji , setclickEmoji] = useState(false);
    const user = useSelector((state) => state.auth.login.currentUser);
    const handleSetvalue = (e)=> {
        settextCaption(e.target.value)
    }

    const onFileChange = (event) => {
        const file = event.target.files;
        setFileList([...fileList,...file]);
    };


    const pushfile = ()=>{
        if (refFile.current) {
            refFile.current.onClick();
        }
        else {
            console.error('Không tìm thấy thẻ input');
        }
    }

    useEffect(()=>{
        const newfileformat = fileList.map((value, index)=>{
            return({
                    index: index ,
                    src : URL.createObjectURL(value),
                    type : value.type
            })
            }
        )
        setfileformat([...newfileformat])
    },[fileList])
    // Upload file lên Server 
    const HandleSubmitFile = async (e)=> {
        e.preventDefault()
        const newPost = {
            userId : user._id,
            username: user.username,
            textpost: textCaption,
            Article_ImgsorVideo: []
        }
        // Load file lên Server
        if (fileList) {
            for(let i = 0; i < fileList.length; i++) {
                const data = new FormData()
                const fileName = Date.now() + fileList[i].name
                data.append("name", fileName)
                data.append("file", fileList[i])
                newPost.Article_ImgsorVideo.push({
                    type: fileList[i].type , 
                    src : `http://localhost:3000/apiPost/${fileName}`
                })
                try {
                    await axios.post("http://localhost:3000/upload", data ,{
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        // create post database
        try {
            await axios.post("http://localhost:3000/post/create", newPost)
            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }

    }

    return ( 
        <div className={cx("main",!stateComponent && "hidden")}
            ref = {refWrapper}
            onClick={(e)=>{
                if(e.target === refWrapper.current){
                    setstateCompoment(false);
                }
            }}
        >
            <div className={cx("wrapper")}>
                <div className={cx("upload__file")}
                >
                    {
                        fileList.length === 0 ?
                        <div className={cx('title')}>
                            Create new post
                        </div>
                        :
                        <div className={cx('titleF')}>
                            <div className={cx('back__button')} >
                                <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                            </div>
                            <div className={cx('title')}>
                                Create new post
                            </div>
                            <button className={cx('submit__button')} onClick={HandleSubmitFile}>
                                Post
                            </button>

                        </div>
                    }
                        
                        <div
                            className={cx('createpost')}

                        >
                            <form className={cx('createpost_uploadfile')}
                                ref={formUploadFile}
                            >
                                {
                                fileList.length === 0 ?
                                <>
                                    <div className={cx('createpost__icon')}>
                                        <Imgs src= {icons.iconCreatePost}></Imgs>
                                        <span className={cx('createpost__text')}>
                                            Drag photos and videos here
                                        </span>
                                    </div>
                                </>
                                :
                                <>
                                    
                                    <div className={cx('file__push')}>
                                        <SlidesArticle Article_ImgsorVideo={fileformat}></SlidesArticle>
                                    </div>
                                    <label 
                                        className={cx('list__button')} 
                                        onClick={pushfile}
                                        htmlFor="fileInput"
                                    >
                                        <div className={cx('drop__img')}>
                                            <Imgs src={icons.iconAddPost} className={cx('drop__img--icon')}></Imgs>
                                        </div>
                                    </label>
                                </>
                                }
                                <input 
                                    multiple
                                    type="file" 
                                    name ="file"
                                    accept=".mp4 ,.jpg, .jpeg, .png" 
                                    className={cx('upload__file--btn')}
                                    onChange={onFileChange}
                                    style={fileList.length > 0 ? {display:'none'} : {}}
                                />
                            </form>


                            {/* info from post */}
                            <div className={cx('info')}>
                                <div className={cx('info__wrapper')}>
                                    <div className={cx('info__post')}>
                                        <div className={cx('info__user')}>
                                            <div className={cx('info__user-avatar')}>
                                                <AvatarImg  
                                                    story={"no"}
                                                    size={"small"}
                                                ></AvatarImg>
                                            </div>
                                            <span className={cx('info__username')}>
                                                Quaan
                                            </span>
                                        </div>
                                        <textarea
                                            id="textInput"
                                            placeholder="Write a captions"
                                            className={cx('input_captions')}
                                            ref={reftextCaption}
                                            onChange={handleSetvalue}
                                            value={textCaption}

                                        />
                                        <div className={cx('emoji')}>
                                            <div className={cx('emoji__icon')}>
                                                <Imgs src={icons.iconEmoji}
                                                        onClick = {
                                                            ()=>{
                                                               setclickEmoji(!clickEmoji);
                                                            }
                                                        }
                                                ></Imgs>
                                                <div className={cx(clickEmoji === false ? 'hidden' : 'list__emoji')}>
                                                    <EmojiPicker searchDisabled ={true} 
                                                        width={"300px"}
                                                        height={"260px"}
                                                        onEmojiClick={(emoji)=>{
                                                            var stringtext = reftextCaption.current.value + emoji.emoji;
                                                            settextCaption(stringtext)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className={cx('count__text')}>
                                                {textCaption.length}/ 2500
                                            </span>
                                        </div>
                                    </div> 
                                    <div className={cx('settings')}>
                                        <div className={cx('location')}>
                                            <input placeholder="Location" className={cx('location--text')}></input>
                                            <FontAwesomeIcon className={cx("icon-settings")} icon={faLocationDot}></FontAwesomeIcon>
                                        </div>
                                        <div className={cx('accessibility')}>
                                            <div className={cx('accessibility--text')}>
                                                Accessibility
                                            </div>
                                            <FontAwesomeIcon className={cx("icon-settings")} icon={faAngleDown}></FontAwesomeIcon>
                                        </div>
                                        <div className={cx('advance__settings')}>
                                            <div className={cx('advance__settings--text')}>
                                                Advanture Settings
                                            </div>
                                            <FontAwesomeIcon className={cx("icon-settings")} icon={faAngleDown}></FontAwesomeIcon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 

                </div>

                {/* Close */}
                <div className={cx('close__btn')} onClick={
                    ()=>{
                        setstateCompoment(false);
                    }
                }>
                    <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </div>
            </div>
        </div> 
    );
}

export default UploadPost;