import RecipeCard from "./RecipeCard";
import styled from "styled-components";

function CookBook({cookbookRecipes , handleDeleteRecipe }){
    
    return <>
    <Header1>Saved Meals</Header1>
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

const Header1 = styled.h1`
font-family: 'Kalam', cursive;
font-weight: bold;
color: #551A8B;
`