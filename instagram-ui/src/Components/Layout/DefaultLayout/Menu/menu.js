
import { Stingitem } from '../MoreItem/index.js';
import { MoreWrapper } from '../MoreSettings';
import Tippy from '@tippyjs/react/headless';
import styles from './MenuStyle.module.scss'
import classNames from 'classnames/bind.js';
import { listmore } from '../Sidebar/listsb.js';
import MenuHeader from './Header.js';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Menu({children}) {
    const [history , setHistory] = useState([{data : listmore}]);
    const currentmenu  = history[history.length - 1]

    const renderItems = () => {
        return (currentmenu.data.map((item, index) => {
            const isParent = !!item.children;

            if (item.block==='true'){
                return(<div key={index} className={cx(item.type)}></div>)
            }
            if(item.iconitem === 'false'){
                return (
                    <Stingitem 
                        key={index} 
                        hidden={'true'} 
                        text ={item.nameitem}
                        inputs={item.change}
                        onclick={() =>{
                            console.log(item.change)
                            if(isParent){
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