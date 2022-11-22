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
        {recipes.length <= 0 ? <Header1>Find Good Eats!</Header1> : <Header1></Header1>}  
         <SearchForm onSubmit = {handleSubmit}> 
            <div className="searchFields">
            <input className = 'searchText' onChange = {handleChange} type = "text" 
                name = "search" 
                placeholder = "e.g. chicken and broccoli" 
                value = {searchTerms} >
            </input>
            <input className = 'submit' type = "submit" value = "Search"></input>
            </div>
        </SearchForm>

        {recipes.length > 0 ? <Header1>Found Recipes</Header1> : <></>}
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

const Header1 = styled.h1`
font-family: 'Kalam', cursive;
font-weight: bold;
color: #551A8B;
text-align: center;
`

const SearchForm = styled.form`
display: flex;
justify-content: center;
input{
    width: 200px;
    height: 30px;
    font-size: 15px;
    background-color: #AAC6E6;
    border: solid #551A8B;
    border-radius: 20px;
    font-family: 'Kalam', cursive;
    font-weight: bold;
    color: #551A8B;
}
input.searchText{
    text-align: center;
}
input.submit{
    margin-left: 20px;
    width: 100px;
}
`