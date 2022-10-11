import React , { useState } from "react";
import RecipeList from "./RecipeList";

function Search ({apiKey}){

    const [searchTerms, setSearchTerms] = useState("")
    const [recipes, setRecipes] = useState([])
    
    const CSS = {textDecoration: 'none'  , textAlign: 'center' , backgroundColor: '#AAC6E6' , border: 'solid purple' , fontFamily:'Lucida Handwriting , cursive' , color: 'purple' }

    
    function handleChange(e){
        const value = e.target.value
        setSearchTerms(value)
    }

   

    function handleSubmit(e){
        e.preventDefault()
        
        console.log('search')
        
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerms}&number=15`)
            .then((r) => r.json())
            .then((data) => {
                
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
        
       
    }


console.log(recipes)

    return (
        <>
         <form onSubmit = {handleSubmit} style= {{margin: '30px'}}>
            <label style = {{fontFamily:'Lucida Handwriting , cursive' , color: 'purple' }}>
                Search Recipes:

                <input onChange = {handleChange} type = "text" 
                name = "search" 
                placeholder = "e.g. chicken and broccoli" 
                value = {searchTerms}></input>

            </label>
            <input type = "submit" value = "Search" style = {CSS}></input>
        </form>

        <RecipeList recipes = {recipes} setRecipes = {setRecipes} />
        </>
       
    )
}


export default Search