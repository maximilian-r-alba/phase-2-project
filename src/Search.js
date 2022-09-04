import React , { useState } from "react";
import RecipeList from "./RecipeList";

function Search ({apiKey}){

    const [searchTerms, setSearchTerms] = useState("")
    const [recipes, setRecipes] = useState([])

    function handleChange(e){
        const value = e.target.value
        setSearchTerms(value)
    }


    function handleSubmit(e){
        e.preventDefault()

        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerms}?`)
            .then((r) => r.json())
            .then((data) => {
                console.log('search ', data)
                setRecipes((recipes) => {
                    const updater = data.results.map((recipe) =>{
                        const recipeObj = {}
                        recipeObj['id'] = recipe.id
                        recipeObj['title'] = recipe.title
                        recipeObj['url'] = recipe.image
                        
                        return recipeObj
                    })
                    return updater
                })
            })
        
            setSearchTerms("")
    }


    return (
        <>
         <form onSubmit = {handleSubmit}>
            <label>
                Search Recipes:

                <input onChange = {handleChange} type = "text" 
                name = "search" 
                placeholder = "e.g. chicken and broccoli" 
                value = {searchTerms}></input>

            </label>
            <input type = "submit" value = "Search"></input>
        </form>

        <RecipeList recipes = {recipes} setRecipes = {setRecipes} />
        </>
       
    )
}


export default Search