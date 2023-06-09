import React,{Fragment} from "react";
import classes from "./Header.module.css";
import HeaderButton from "./HeaderButton";
import mealsImage from '../../assets/meals1.jpg'


const Header = (props) => {
    return (
<Fragment>
     <header className={classes.header}>
        <h1 className={classes.headerName}>Foodess</h1>
        <HeaderButton onShow = {props.onShow}/>
     </header>
    <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table with delicious food"></img>
    </div>
        </Fragment>
    )
}

export default Header