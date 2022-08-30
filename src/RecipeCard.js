import React from "react";
import './RecipeCard.css'
//CSS from https://codepen.io/alexpopovich/pen/weMgMJ
function RecipeCard({ id , title , image }){

    return(
        <div id = {id} className = "card" >

            <div className = "recipeDetails">
            <h1>{title}</h1>
            <img src = {image} alt = {title}></img>
            <p class = "description">Lorem ipsum dolor</p>
            </div>
            <button>Add to Cookbook</button>

        </div>
    )
}

export default RecipeCard