import React , {useState} from "react";
import RecipeCard from "./RecipeCard";

function RecipeList ({recipes}){
    console.log('in recipelist ', recipes)
    const recipeArray = recipes.map((recipe) => {
        return <RecipeCard id = {recipe.id} title = {recipe.title} image = {recipe.image} />
    })
    return(
        <>
        <h1>Found Recipes</h1>
        {recipeArray}
        </>
      
    )
}

export default RecipeList