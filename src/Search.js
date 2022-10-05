import React , { useState } from "react";
import RecipeList from "./RecipeList";

function Search ({apiKey}){

    const [searchTerms, setSearchTerms] = useState("")
    const [recipes, setRecipes] = useState([])
    const [offset, setOffset] = useState(0)

    function handleChange(e){
        const value = e.target.value
        setSearchTerms(value)
    }

    useState(()=>{
        if(offset != 0){
            handleSubmit()
        }
        
    }, [offset])

    function handleSubmit(e){
        e.preventDefault()
        
        console.log('submit', offset)
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerms}?&offset=${offset}&number=25`)
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
//Started working on offset handling for viewing more options on search

    function handleOffset(e){
        const button = e.target.textContent
        if (button === "Forward"){
            setOffset((offset+10))
        }
        else if (offset-10 < 0 ){
            return null
         }
        else if (button === "Back"){
            setOffset((offset-10))
        }
       console.log(offset)
        
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
        <button onClick = {handleOffset}>Back</button> 
        <button onClick = {handleOffset}>Forward</button>
        </>
       
    )
}


export default Search