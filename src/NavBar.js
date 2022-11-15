import React from "react";
import { NavLink } from "react-router-dom"
import styled from "styled-components";


function NavBar() {
    const navLinkCSS = {textDecoration: 'none' , borderStyle: 'solid' , textAlign: 'center' , padding: '5px' , margin: '20px' , backgroundColor: '#f7f4e6' , color: '#551A8B' , fontSize: '15px'}

    return (
        <>
        
        <img src={require('./Images/good-eats-logo.png')} style= {{display:'block' , marginLeft: 'auto', marginRight: 'auto' , width: '400px'}} alt="good eats logo"></img>
        
   
        <Nav >
            
            <NavLink to="/" style={navLinkCSS}>Search </NavLink>
            <NavLink to="/cookbook" style={navLinkCSS}>Cookbook </NavLink>
            <NavLink to="/mealplan" style={navLinkCSS}>Meal Plan </NavLink>

        </Nav>
        </>
        
    );
}

export default NavBar;

const Nav = styled.nav`
width: 100vw;
height: 2em;
font-size: 20px;
font-family: 'Kalam', cursive;
font-weight: bold;
`