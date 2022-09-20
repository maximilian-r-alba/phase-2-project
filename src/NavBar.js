import React from "react";
import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <nav >
            <NavLink exact to="/">Home </NavLink>
            <NavLink to="/search">Search </NavLink>
            <NavLink to="/cookbook">Cookbook </NavLink>
            <NavLink to="/mealplan">Meal Plan </NavLink>
        </nav>
    );
}

export default NavBar;
