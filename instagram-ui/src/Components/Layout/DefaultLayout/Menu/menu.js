
import { Stingitem } from '../MoreItem/index.js';
import { MoreWrapper } from '../MoreSettings';
import Tippy from '@tippyjs/react/headless';
import styles from './MenuStyle.module.scss'
import classNames from 'classnames/bind.js';
import { listmore } from '../Sidebar/listsb.js';
import MenuHeader from './Header.js';
import { createAxios } from '~/createInstance.js';

import { useNavigate } from 'react-router-dom';
import { logOut } from '~/CallAPI/callApi.js';
import { useSelector } from 'react-redux';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOutSucessfully } from '~/Redux/authSlice.js';
const cx = classNames.bind(styles);

function Menu({children}) {
    const [history , setHistory] = useState([{data : listmore}]);
    const currentmenu  = history[history.length - 1];
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currrentUser);
    const id = user?._id;
    const token = user?.token;

    const axiosJWT = createAxios(user , dispatch ,logOutSucessfully)

    
    const handleLogout = () =>{
        logOut(dispatch, id , navigate , token ,axiosJWT);
    }
    const renderItems = () => {
        return (
            currentmenu.data.map((item, index) => {
            const isParent = !!item.children;
            //Create space 
            if (item.block==='true'){
                return(
                    <div key={index} className={cx(item.type)}></div>
                )
            }
            // Check the item have itemicon 
            if(item.iconitem === 'false'){
                return (
                    <Stingitem 
                        key={index} 
                        hidden={'true'} 
                        linkitem={item.link}
                        text ={item.nameitem}
                        inputs={item.change}
                        onclick= {() => {
                            if(item.nameitem === "Log out"){
                                handleLogout()
                            }
                            else if (isParent){
                                setHistory(prev => [...prev ,item.children])
                            }
                        }}
                    />
                );
            }
            else{
                return (
                    <Stingitem key={index} 
                        icon={item.iconitem} 
                        text ={item.nameitem}
                        onclick={() =>{
                        if(isParent){
                            setHistory(prev => [...prev ,item.children])
                        }
                    }}
                    />
                );
            }
        }
        )
        );
    }

    // Render the menu
    return (
        <Tippy
        trigger='click'
        placement='top-start'
        interactive
        render={attrs => (
            <div className= {cx('Menu')} tabIndex="-1" {...attrs}>
                <MoreWrapper>
                    {history.length > 1  && 
                    <MenuHeader 
                        title={currentmenu.title}
                        onBack={()=>{
                            setHistory(prev =>prev.slice(0,prev.length - 1)
                            )
                        }}   
                    
                    />}
                    {renderItems()}
                </MoreWrapper>
            </div>
        
            )}

        onHidden={()=>{
            setHistory(prev =>prev.slice(0,1))
        }}
        >
            {children}
        </Tippy>
    );
}

export default Menu;