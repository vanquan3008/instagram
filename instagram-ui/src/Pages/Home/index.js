import classNames from "classnames/bind";
import styles from "./HomeStyle.module.scss"


import { ImgStory } from "~/Components/Layout/DefaultLayout/imgStory";
import { Article } from "../../Components/Article/index.js";
import image from "~/Assets/img";
import { Imgs } from "~/Components/Image";

// import { _articlesSuggest  } from "./ListArticle.js";
import InfoGeneral from "~/Components/Layout/DefaultLayout/Iginfo/info";
import { FooterLayOut } from "~/Components/Layout/DefaultLayout/Footer/index.js";
import { DefaultLayout } from "~/Components/Layout";

import { useState } from "react";
import { useSelector  } from "react-redux";
import { useDispatch } from "react-redux";
import {createAxios} from '../../createInstance.js';
import { loginSucessfully } from "~/Redux/authSlice";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js"
import { SettingsPost } from "~/Components/SettingsPost";
const cx = classNames.bind(styles)
const value = [
    {
        username : 'vanquan_12',
        imageStory : 'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3'
    },
    {
        username : 'vanquan_134',
        imageStory : 'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3'
    }
    ,
    {
        username : 'vanquan_1234',
        imageStory : 'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3'
    },
    {
        username : 'vanquan_1234',
        imageStory : 'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3'
    }
    ,
    {
        username : 'vanquan_1234',
        imageStory : 'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3'
    },
    {
        username : 'vanquan_1234',
        imageStory : 'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3'
    }
    ,
    {
        username : 'vanquan_1234',
        imageStory : 'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3'
    },
    {
        username : 'vanquan_1234',
        imageStory : 'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3'
    },
    {
        username : 'vanquan_1234',
        imageStory : 'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3'
    },
    {
        username : 'vanquan_1234',
        imageStory : 'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3'
    }
]

const listSuggest = [
    {
        buttontype : 'following' ,
        username : 'vanquan_12',
        name: 'Văn Quân',
        image:'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3',
        namebutton: 'Follow'
    },
    {
        buttontype : 'following' ,
        username : 'vanquan_12',
        name: 'Văn Quân',
        image:'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3',
        namebutton: 'Follow'
    },
    {
        buttontype : 'following' ,
        username : 'vanquan_12',
        name: 'Văn Quân',
        image:'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3',
        namebutton: 'Follow'
    },
    {
        buttontype : 'following' ,
        username : 'vanquan_12',
        name: 'Văn Quân',
        image:'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3',
        namebutton: 'Follow'
    },
    {
        buttontype : 'following' ,
        username : 'vanquan_12',
        name: 'Văn Quân',
        image:'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3',
        namebutton: 'Follow'
    },
    {
        buttontype : 'following' ,
        username : 'vanquan_12',
        name: 'Văn Quân',
        image:'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3',
        namebutton: 'Follow'
    },
    {
        buttontype : 'following',
        username : 'vanquan_12',
        name: 'Văn Quân',
        image:'https://th.bing.com/th/id/OIP.ClxiUPMj-9dNga0vVpK65gHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.3',
        namebutton: 'Follow'
    }
]

function Home() {
    const dispatch = useDispatch();
    const [_articles, setarticles] = useState([]);
    const user = useSelector((state) => state.auth.login.currentUser);
    const [_articlesSuggest ,setarticlesSucess] = useState([]);
    const [onclickSetting , setonclickSetting] = useState(false);
    const [clickPostSetting , setonclickPostSetting] = useState(null);

    const usermain = {
        buttontype : 'switch' ,
        username : user?.username,
        name: user?.fullname ,
        image:user?.profilePicture,
        namebutton: 'Switch'
    } 
    createAxios(user,dispatch,loginSucessfully)

    const renderStory  = value.map((value,index)=>{
        return(
           <li key={index} className={cx('StoryItem')}>
                <ImgStory  info = {value} >
                </ImgStory>
            </li>
        )
    })
    // Trả về bài viết 
    useEffect(()=>{
        const renderPost = async ()=>{
            const listPost = await axios.get("http://localhost:3000/post/timeline/" + user._id)
            const  PostNew=listPost.data.map((value)=>{
                const {createdAt , updatedAt , ...other} = value;
                other.day_post = format(createdAt)

                return other;
            })
            setarticles(PostNew)
        }
        renderPost()
    },[user])

    const _articles_line = _articles.map((cur, index) => {
        return _articles[_articles.length - index - 1];
    });
    // Render
    const renderPost = _articles_line.map(
        (value,index)=>{
            return(
                <Article

                    key={index} 
                    articles={value}
                    onhandlemore={setonclickSetting}
                    setpost = {setonclickPostSetting}
                ></Article>
            );
        }
    )
    


    useEffect(()=>{
        const renderPost = async ()=>{
            const listPostSuccess = await axios.get("http://localhost:3000/post/timeline/postsuccess/" + user._id)
            const  PostNewSuccess=listPostSuccess.data.map((value)=>{
                const {createdAt , updatedAt , ...other} = value;
                other.day_post = format(createdAt)

                return other;
            })
            setarticlesSucess(PostNewSuccess)
        }
        renderPost()
    },[user])

    const _articlesSuccess_line = _articlesSuggest.map((cur, index) => {
        return _articlesSuggest[_articlesSuggest.length - index - 1];
    });

    
    const renderPostSuggest = _articlesSuccess_line.map(
        (value,index)=>{
            return(
                <Article

                    key={index} 
                    articles={value}
                    onhandlemore={setonclickSetting}
                    setpost = {setonclickPostSetting}
                ></Article>
            );
        }
    )

    const renderlistFriendSuggest = listSuggest.slice(0,5).map(
        (value,index)=>{
            return(
                <InfoGeneral 
                    key={index}
                    value={value} 
                    buttontype={value.buttontype} 
                    namebutton={value.namebutton}
                    story={'no'}
                    hoverelement={'no'}
                    nopadding={'yes'}
                    className = {cx('FriendSuggest')}
                ></InfoGeneral>
            )
        }
    )

    return(
   <>
       <DefaultLayout>
            <main>
                <div className={cx('HomePage')}>
                    <div className={cx('Home-main')}>
                        {/* Story */}
                        <div className={cx('Story')}>
                            <ul className={cx('listStory')}>
                                <li className={cx('Space_Left')}></li>
                                {renderStory}
                                <li className={cx('Space_Right')}></li>
        
                            </ul>
                        </div>
                        {/* Content */}
                        <div className={cx('Content')}>
                            <div className={cx('MarginBottom_24px')}></div>
                            <div className={cx('MarginBottom_16px')}></div>
        
                            {/* Post Friend*/}
                            <div className={cx('Post_Friend')}>
                                {renderPost}
                                {/* Between read articled and not read article  */}
                                <div className={cx('Betweenarticle')}>
                                    <div className={cx('NotiRead')}>
                                        <div className={cx('WrapperNoti')}>
                                            <div className={cx('CheckRead')}>
                                                <Imgs className={cx('Size_72')} src = {image.checkiconInsta}></Imgs>
                                            </div>
                                            <div className={cx('Note1')}>
                                                <span>You're all caught up</span>
                                            </div>
                                            <div className={cx('Note2')}>
                                                <span>You've seen all new posts from the past 3 days.</span>
                                            </div>
                                            <a href="/" className={cx('NotePast')}>
                                                View older posts
                                            </a>
         
                                        </div>
                                    </div>
                                    <div className={cx('SuggestPost')}>
                                        <span>Suggested Posts</span>
                                    </div>
                                </div>
                                {renderPostSuggest}
                            </div>
                        </div>
                        {/*Footer*/}
                    </div>
                    {/* infomation */}
                    <div className={cx('Infomation')}>
                        <div className={cx('wrapper')}>
                            {/* User me */}
                            <div className={cx('user')}>
                                <InfoGeneral 
                                    value={usermain} 
                                    imageSize={'big'}
                                    buttontype={usermain.buttontype} 
                                    namebutton={usermain.namebutton}
                                    story={'no'}
                                    hoverelement={'no'}
                                    nopadding={'yes'}
                                ></InfoGeneral>
                            </div>
                            {/*Suggest for you */}
                            <div className={cx('guest')}>
                                <div className={cx('guest_main')}>
                                    <div className={cx('header')}>
                                        <div className={cx('text')}>
                                            <span>Suggest for you</span>
                                        </div>
                                        <a href="/">See All</a>
                                    </div>
                                    <div className={cx('containers')}>
                                        {renderlistFriendSuggest}
                                    </div>
                                </div>
        
                            </div>
                            <div className={cx('footer')}>
                                <ul className={cx('listfooter')}>
                                    <li className={cx('item')}>
                                        <a href="/">About</a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/">Help</a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/">Press</a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/">API</a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/">Jobs</a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/">Privacy</a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/">Terms</a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/">Locations</a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/">Languages</a>
                                    </li>
                                    <li className={cx('item')}>
                                        <a href="/">Meta Verified</a>
                                    </li>
                                </ul>
                                <span>
                                © 2023 Instagram from Meta
                                </span>
                            </div>
                        </div>
                    </div>
        
                </div>
                <FooterLayOut></FooterLayOut>
            </main>
       </DefaultLayout>

       <SettingsPost 
            hidden={onclickSetting} 
            sethidden ={setonclickSetting} 
            post = {clickPostSetting}
        ></SettingsPost>
   </>
    );
}

export default Home;
