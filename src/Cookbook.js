import React , {useState , useEffect} from "react";
import RecipeCard from "./RecipeCard";


function CookBook({cookbookRecipes}){
    const [recipes, setRecipes] = useState(cookbookRecipes)
    
    return <>
    <h1 style={{fontFamily: 'Papyrus, fantasy'}}>Saved Meals</h1>
    {recipes.map((recipe) => {
        return <RecipeCard key = {recipe.id} recipeObj = {recipe} cookbook = {true} />
    })}
    
    </>



}

export default CookBook;