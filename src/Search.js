import { useState } from "react";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";

function Search ({apiKey , handleRecipes , recipes}){

    const [searchTerms, setSearchTerms] = useState("")

    function handleChange(e){
        const value = e.target.value
        setSearchTerms(value)
    }

 
    function handleSubmit(e){
        e.preventDefault()
        
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerms}&number=2`)
            .then((r) => r.json())
            .then((data) => {
                
                console.log(data)
                const foundRecipes = data.results.map((recipe) =>{
                    const recipeObj = {id: recipe.id, title: recipe.title, url: recipe.image}
     
                    return recipeObj})
                   
                    handleRecipes(foundRecipes)

                if(foundRecipes.length <= 0) alert('No recipes found')
            })
        setSearchTerms("")
        
       
    }

    function recipeFilter(recipeObj){
        const filteredList = recipes.filter((recipe) =>{
            return recipe.id !== recipeObj.id
        })
        
        handleRecipes(filteredList , recipeObj)
    }


    return (
        <>
         <form onSubmit = {handleSubmit}>
            <h1>Find Good Eats!</h1>   
            <div>
            <input onChange = {handleChange} type = "text" 
                name = "search" 
                placeholder = "e.g. chicken and broccoli" 
                value = {searchTerms} >
            </input>
            <input type = "submit" value = "Search"></input>
            </div>
        </form>

        {recipes.length > 0 ? <h1>Found Recipes</h1> : <></>}
        <CardConatiner >
        {recipes.map((recipe) => {
            return <RecipeCard key = {recipe.id} addRecipe = {recipeFilter} recipeObj = {recipe} />
        })}
        </CardConatiner>
        
       
        </>
       
    )
}


export default Search

const CardConatiner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 30px;
`