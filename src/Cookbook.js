import RecipeCard from "./RecipeCard";


function CookBook({cookbookRecipes , handleDeleteRecipe }){
    
    return <>
    <h1>Saved Meals</h1>
    {cookbookRecipes.map((recipe) => {
        return <RecipeCard key = {recipe.id} recipeObj = {recipe} cookbook = {true} handleDeleteRecipe = {handleDeleteRecipe} />
    })}
    
    </>



}

export default CookBook;