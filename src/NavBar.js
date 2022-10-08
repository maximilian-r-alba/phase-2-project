import React from "react";
import { NavLink } from "react-router-dom"


function NavBar() {
    return (
        <>
        
        <img src={require('./Images/good-eats-logo.png')} style= {{display:'block' , marginLeft: 'auto', marginRight: 'auto'}} alt="good eats logo"></img>
        
   
        <nav style={{width: '30vw' , height:'2em' , fontSize: '20px' , fontFamily:'Lucida Handwriting , cursive' , width: '100vw'}} >
            <NavLink exact to="/" style={{textDecoration: 'none' , borderStyle: 'solid' , textAlign: 'center' , padding: '10px' , margin: '25px' }}>Home </NavLink>
            <NavLink to="/search" style={{textDecoration: 'none' , borderStyle: 'solid' , textAlign: 'center' , padding: '10px' , margin: '25px' }}>Search </NavLink>
            <NavLink to="/cookbook" style={{textDecoration: 'none' , borderStyle: 'solid' , textAlign: 'center' , padding: '10px' , margin: '25px' }}>Cookbook </NavLink>
            <NavLink to="/mealplan" style={{textDecoration: 'none' , borderStyle: 'solid' , textAlign: 'center' , padding: '10px' , margin: '25px' }}>Meal Plan </NavLink>
        </nav>
        </>
        
    );
}

export default NavBar;
