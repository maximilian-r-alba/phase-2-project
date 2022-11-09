import RecipeCard from "./RecipeCard";
import styled from "styled-components";

function CookBook({cookbookRecipes , handleDeleteRecipe }){
    
    return <>
    <h1>Saved Meals</h1>
    <CardConatiner>
    {cookbookRecipes.map((recipe) => {
        return <RecipeCard key = {recipe.id} recipeObj = {recipe} cookbook = {true} handleDeleteRecipe = {handleDeleteRecipe} />
    })}
    </CardConatiner>
    
    </>
}

export default CookBook;

const CardConatiner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 30px;
`