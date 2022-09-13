import React , {useState} from "react";
import RecipeCard from "./RecipeCard";

function RecipeList ({recipes , setRecipes }){
    
    function recipeFilter(id){
       
        setRecipes((recipes) => {
            const list = recipes.filter((recipe) =>{
                return recipe.id != id
            })
            return list
        })
    }

    const recipeArray = recipes.map((recipe) => {
        return <RecipeCard key = {recipe.id} addRecipe = {recipeFilter} id = {recipe.id} title = {recipe.title} url = {recipe.url} />
    })

   
    return(
        <>
        <h1>Found Recipes</h1>
        {recipeArray}
        </>
      
    )
}

export default RecipeList