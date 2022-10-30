import React , { useState } from "react";
import RecipeCard from "./RecipeCard";

function Search ({apiKey , setRecipes , recipes}){

    const [searchTerms, setSearchTerms] = useState("")
    
    
    // const CSS = {textDecoration: 'none'  , textAlign: 'center' , backgroundColor: '#AAC6E6' , border: 'solid #5518AB' , fontFamily:'Lucida Handwriting , cursive' , color: '#5518AB' ,  width: '70px' , height: '40px' , marginRight: 'auto'}

    // const formCSS = {}

    
    function handleChange(e){
        const value = e.target.value
        setSearchTerms(value)
    }

   

    function handleSubmit(e){
        e.preventDefault()

        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerms}&number=1`)
            .then((r) => r.json())
            .then((data) => {

                const foundRecipes = data.results.map((recipe) =>{
                    const recipeObj = {id: recipe.id, title: recipe.title, url: recipe.image}
     
                    return recipeObj})

                    setRecipes(foundRecipes)

                if(foundRecipes.length <= 0) alert('No recipes found')
            })

        setSearchTerms("")
       
    }

    function recipeFilter(id){
        const list = recipes.filter((recipe) =>{
            return recipe.id !== id
        })
        
        setRecipes(list)
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

         {/* <form onSubmit = {handleSubmit} style= {{marginLeft: 'auto' , marginRight: 'auto' , width: '70vw'}}>
            <h1 style = {{fontFamily:'Lucida Handwriting , cursive' , color: '#5518AB' , fontSize: '40px' , textAlign: 'center', display: "block"}}>
                Find Good Eats!
            </h1>   
            <div style = {{display: 'flex' , flexDirection: 'row' , margin: 'auto' , alignContent: 'center'}}>
            <input onChange = {handleChange} type = "text" 
                name = "search" 
                placeholder = "e.g. chicken and broccoli" 
                value = {searchTerms} style = {{width: '30vw', height: '30px', fontSize: '15px' , marginLeft: 'auto'}}>
            </input>
            <input type = "submit" value = "Search" style = {CSS}></input>
            </div>
           
            
        </form>
        {recipes.length != 0 ? <h1 style = {{fontFamily: 'Lucida Handwriting , cursive' , color: '#5518AB'}}>Found Recipes</h1> : <></>} */}

        {recipes.map((recipe) => {
            return <RecipeCard key = {recipe.id} addRecipe = {recipeFilter} recipeObj = {recipe} />
        })}
        </>
       
    )
}


export default Search