import classNames from "classnames/bind";
import styles from './buttonStyle.module.scss';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function Button(
    {
        to , 
        herf ,
        onClick , 
        type ='', 
        disable = false,
        primary = 'defaultButton', 
        sizetext = 'medium' ,
        children,
        ...passprops
    }) 
    {



    const Type = (type !== 'button' ? 'hidden' : '' )
    let Comp = 'button'
    const props = {
        onClick,
        ...passprops
    }
    if(disable){
        delete props.onClick
    }
    if(to)
    {
        props.to = to;
        Comp = Link
        
    }
    else if (herf)
    {
        props.herf = herf;
        Comp = 'a'
    }
    
    const classes = cx('wrapper' , 
                        Type , 
                        primary , 
                        sizetext,
                        disable
                        )
    return (
        <Comp className = {classes} >
            <span>{children}</span>
        </Comp>
    
    );
}

export default Button;