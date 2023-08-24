import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './searchStyle.module.scss'
import classNames from 'classnames/bind';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import InfoGeneral from '../Iginfo/info';
import { useState } from 'react';
import { historySearch } from './historySearch';

const cx = classNames.bind(styles);

function SearchUI({display}) {
    const [checksearch,setchecksearch] = useState(false)
    const [searchValue , setsearchValue] = useState("")

    const renderhistory =  historySearch.map((value,index)=> {
        return(
            <InfoGeneral 
                key={index} 
                value = {value} 
                buttontype ={value.buttontype}
            ></InfoGeneral>
            );
        }
    )
        
    return ( 
        <div className={cx('wrapper')} style={{display : display}} onClick={(event)=>{
                if(event.target.className === cx('find') || event.target.className === cx('inner') ){
                    setchecksearch(true)
                }
                else{
                    setchecksearch(false)
                }
            }}>
            <div className={cx('title')}>
                <div className={cx('text')}>
                    <span>Search</span>
                </div>
            </div>


            <div className={cx('Search')}>
                <div className={cx('Search-box')}>
                    <input  className = {cx('find')}  
                            spellCheck='false' 
                            type='text'
                            onChange={(e)=>{
                                setsearchValue(e.target.value);
                            }}
                    />
                    <div className={cx('inner',checksearch && 'hidden')} >
                        <FontAwesomeIcon className={cx('search-icon')} icon = {faSearch}></FontAwesomeIcon>
                        <div className={cx('inner-text')}>{searchValue === "" ? "Search" : searchValue}</div>
                    </div>
                    <button className={cx('clear', !checksearch && 'hidden')}>
                        <FontAwesomeIcon
                            icon={faCircleXmark} 
                            className={cx('close-icon' ,!checksearch && 'hidden')}
                        >
                        </FontAwesomeIcon>
                    </button>
                    <FontAwesomeIcon icon={faSpinner} className={cx('load-icon' , !checksearch && 'hidden')}></FontAwesomeIcon>
                </div>
                <div className={cx('box')}></div>
            </div>

            
            <div className={cx('results')} >
                    <div className={cx('results-title')}>
                            <span>Recent</span>
                            <button className={cx( historySearch.length > 0 ? 'clear' :'hidden')}>Clear all</button>
                    </div>
                    <div className={cx('results-list', historySearch.length > 0 ? 'hidden' :'')}>
                        <span>No recent search</span>
                    </div>
                    <div className={cx(historySearch.length <= 0 ? 'hidden' :'results-find')}>
                        {
                           renderhistory
                        }
                </div>
            </div>

            <div className={cx('results-find' , 'hidden')}>

            </div>
        </div>
     );
}

export default SearchUI;