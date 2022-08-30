import React from "react";

function RecipeCard({ id , title , image }){
    
    return(
        <div id = {id}>
            <h1>{title}</h1>
            <img src = {image} alt = {title}></img>
        </div>
    )
}

export default RecipeCard