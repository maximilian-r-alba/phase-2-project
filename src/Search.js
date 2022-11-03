import { useState } from "react";
import RecipeCard from "./RecipeCard";

function Search ({apiKey , handleRecipes , recipes}){

    const [searchTerms, setSearchTerms] = useState("")
    const [offset, setOffset] = useState(0)



    function handleChange(e){
        const value = e.target.value
        setSearchTerms(value)
    }

    function handleOffset(e){

       
        setOffset((offset) => offset + parseInt(e.target.value))
        handleSubmit(e)
        
    }
    
    function handleSubmit(e){
        e.preventDefault()
        
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerms}&number=1&offset=${offset}`)
            .then((r) => r.json())
            .then((data) => {
                
                const foundRecipes = data.results.map((recipe) =>{
                    const recipeObj = {id: recipe.id, title: recipe.title, url: recipe.image}
     
                    return recipeObj})
                   
                    handleRecipes(foundRecipes)

                if(foundRecipes.length <= 0) alert('No recipes found')
            })
        
        
       
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

        {recipes.map((recipe) => {
            return <RecipeCard key = {recipe.id} addRecipe = {recipeFilter} recipeObj = {recipe} />
        })}
       
       { offset >0 ? <button onClick = {handleOffset} value = {-5}>Go backward</button> : null}
       <button onClick= {handleOffset} value = {5}> Go forward</button>
        </>
       
    )
}


export default Search