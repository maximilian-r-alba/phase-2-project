import React , { useState } from "react";
import RecipeList from "./RecipeList";

function Search ({apiKey}){

    const [searchTerms, setSearchTerms] = useState("")
    const [recipes, setRecipes] = useState([])
    
    const CSS = {textDecoration: 'none'  , textAlign: 'center' , backgroundColor: '#AAC6E6' , border: 'solid #5518AB' , fontFamily:'Lucida Handwriting , cursive' , color: '#5518AB' ,  width: '70px' , height: '40px' , marginRight: 'auto'}

    const formCSS = {}

    
    function handleChange(e){
        const value = e.target.value
        setSearchTerms(value)
    }

   

    function handleSubmit(e){
        e.preventDefault()
        
        
        
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
         <form onSubmit = {handleSubmit} style= {{marginLeft: 'auto' , marginRight: 'auto' , width: '70vw'}}>
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
        {recipes.length != 0 ? <h1 style = {{fontFamily: 'Lucida Handwriting , cursive' , color: '#5518AB'}}>Found Recipes</h1> : <></>}
        <RecipeList recipes = {recipes} setRecipes = {setRecipes} />
        </>
       
    )
}


export default Search