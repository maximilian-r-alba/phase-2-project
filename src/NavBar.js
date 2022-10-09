import React from "react";
import { NavLink } from "react-router-dom"


function NavBar() {
    const navLinkCSS = {textDecoration: 'none' , borderStyle: 'solid' , textAlign: 'center' , padding: '10px' , margin: '25px' , backgroundColor: '#AAC6E6'}
    return (
        <>
        
        <img src={require('./Images/good-eats-logo.png')} style= {{display:'block' , marginLeft: 'auto', marginRight: 'auto'}} alt="good eats logo"></img>
        
   
        <nav style={{width: '30vw' , height:'2em' , fontSize: '20px' , fontFamily:'Lucida Handwriting , cursive' , width: '100vw'}} >
            
            <NavLink to="/" style={navLinkCSS}>Search </NavLink>
            <NavLink to="/cookbook" style={navLinkCSS}>Cookbook </NavLink>
            <NavLink to="/mealplan" style={navLinkCSS}>Meal Plan </NavLink>

        </nav>
        </>
        
    );
}

export default NavBar;
