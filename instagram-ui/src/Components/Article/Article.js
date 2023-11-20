import classNames from "classnames/bind";
import styles from './ArticleStyle.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis} from "@fortawesome/free-solid-svg-icons";
import image from "~/Assets/img/index.js";
import { Imgs } from "~/Components/Image/index.js";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { SlidesArticle } from "../Slide/index.js";
import { useDispatch, useSelector } from "react-redux";
import { followFunction, unfollowFunction } from "~/CallAPI/authApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const cx = classNames.bind(styles);  

function Article({articles}) {
    const [valueComment , setValueComment] = useState("");
    const [friendfollow , setfriendfollow] = useState(null);
    const [onclickPost , setonclickPost] = useState(null);
    const currentuser = useSelector((state)=>state.auth.login.currentUser);
    const dispatch = useDispatch();


    
    const onClickPost = async (e)=>{
        setonclickPost(articles)
        if(onclickPost?.userId !== currentuser._id &&onclickPost !== null ){
            followFunction(onclickPost?.userId  ,currentuser ,dispatch)
        }
        if(currentuser?.followings.includes(onclickPost?.userId) && onclickPost !== null ){
            unfollowFunction(onclickPost?.userId  ,currentuser ,dispatch)
        }
    }   
    console.log(currentuser?.followings.includes(onclickPost?.userId))
    useEffect(()=>{
        const renderListFriend = async ()=> {
            const renderUser = await axios.get(`http://localhost:3000/auth/find/` + currentuser?._id);
            renderUser?.data.followings.map((userId)=>{
                if(userId === articles.userId){
                    setfriendfollow(true)
                }
                else{
                    setfriendfollow(false)
                }
            })
        }
        renderListFriend()
    },[onclickPost])
    return ( 
        <div className={cx('Article')}>
            {/* Header */}
            <div className={cx('Header_Post')}>
                <a href = '/' className={cx('Image')}>
                    <Imgs className= {cx('Image_UserPost')} src = {image.noImage}></Imgs>
                </a>
                <div className={cx('Posted_By')}>
                    <a href="/" className={cx('Posted_Name')}>
                        <div>{articles?.username}</div>
                        <div className={cx('tick',articles?.tickgreen ? "" :'hidden')}>
                            <Imgs className={cx('tick_icon')} src={image.tickgreen}></Imgs>
                        </div>
                    </a>
                    <a href="/" className={cx('Day')}>
                        <span className = {cx('dot')}>
                            <span>•</span>
                        </span>
                        <time>{articles?.day_post}</time>
                    </a>
                    <div className={cx('Follow')}>
                        <div className = {cx('dot')}>
                            <span>•</span>
                        </div>
                        {
                            currentuser?._id === articles?.userId ? 
                            <h4 className={cx('textFollow')}>
                                You
                            </h4>:
                            <h4 className={cx('textFollow')}
                                onClick={onClickPost}
                            >
                                {
                                    friendfollow ===  true ? 'Following' :'Follow'
                                }
                            </h4>
                        }
                    </div>
                </div>
                <div className={cx('more')}>
                    <FontAwesomeIcon className={cx('moreIcon')} icon = {faEllipsis}></FontAwesomeIcon>
                </div>
            </div>
            {/* Article */}
            <SlidesArticle Article_ImgsorVideo={articles?.Article_ImgsorVideo}></SlidesArticle>
            {/* Comment Like share */}
            <div className={cx('More_Post')}>
                <div className={cx('Lable')}>
                    <div className={cx('Interaction')}>
                        <div className={cx('Like')} >
                            <FontAwesomeIcon 
                                className={cx('Like_icon')}
                                width={'24px'}
                                height={'24px'}
                                icon = {faHeart}>
                            </FontAwesomeIcon>
                        </div>
                        <div className={cx('Comment')}>
                            <FontAwesomeIcon 
                                className={cx('Comment_icon')} 
                                icon ={faComment}
                                width={'24px'}
                                height={'24px'}
                            ></FontAwesomeIcon>
                        </div>
                        <button className={cx('Share')}> 
                            <svg aria-label="Share Post" 
                                color="rgb(0, 0, 0)" 
                                fill="rgb(0, 0, 0)"
                                className={cx('Share_icon')}
                                height="24" 
                                role="img" 
                                viewBox="0 0 24 24" 
                                width="24"
                            >
                                <title>Share Post</title>
                                <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                    <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2">
                                    </polygon>
                            </svg>
                        </button>
                    </div>
                    <div className={cx('Saved')}>
                        <svg aria-label="Save" 
                             color="rgb(0, 0, 0)" 
                             fill="rgb(0, 0, 0)"
                             height="24" role="img"
                             viewBox="0 0 24 24" 
                             width="24"
                        >    
                            <title>Save</title>
                            <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">

                            </polygon>
                        </svg>     
                    </div>
                </div>
                <div className={cx('LikeNumber')}>
                    {/* Nếu có bạn bè like */}
                    <div className={cx('Friend_Like')}>
                        Liked by 
                        <a href="/">Quan</a>
                        and 
                        <button>others</button>
                    </div>
                    {/* Nếu k có bạn bè like */}
                    <div className={cx('NoFriend_like')}>
                        0<span>likes</span>
                    </div>
                </div>


                <div className={cx('Info_Post')} >
                    <div className={cx('Title')}>
                        <button className={cx('User_Post')}>
                            {articles?.username}
                        </button>
                        {articles?.textpost}

                    </div>
                    {/* Text more after click text 'more' */}
                    <span className={cx('ButtonMore')}>
                        more
                    </span>
                    <span className={cx('TextMore')}>

                    </span>
                    {/* Comment */}
                    <div className={cx('List_Comment')}>
                        <span className={cx('ShowComment')}>
                            View all {articles?._comment.length} comments
                        </span>
                        <section className={cx('Input_Comment')}>
                            <div className={cx('WrapperInput')}>

                                <textarea className={cx('Value')} 
                                    placeholder="Add a comment..."
                                    autoComplete="off"
                                    onChange={(e)=>{
                                        setValueComment(e.target.value)
                                    }}
                                >
                                </textarea>

                                <div className={
                                    cx('Click_Post',!!valueComment? '':'hidden')
                                }>
                                    Post
                                </div>

                                <div className={cx('Icons')}>
                                <svg aria-label="Emoji" 
                                    color="rgb(115, 115, 115)" 
                                    fill="rgb(115, 115, 115)"
                                    height="13" role="img" 
                                    viewBox="0 0 24 24" 
                                    width="13">
                                        <title>Emoji</title>
                                        <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                                </svg>
                                </div>
                            </div>
                        </section>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Article;