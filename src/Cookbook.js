import React , {useState , useEffect} from "react";
import RecipeList from "./RecipeList";
import RecipeCard from "./RecipeCard";

function CookBook(){
    const [recipes, setRecipes] = useState()
    const [recipeArray, setRecipeArray] = useState()

    
    useEffect(() => {
        
    fetch("http://localhost:3000/cookbook")
    .then((r) => r.json())
    .then((data) => {
        setRecipes(data)
    })
    },[])

    useEffect(() =>{
        
        if(recipes != undefined){
         
            setRecipeArray((recipeArray) =>{
            const updater = recipes.map((recipe) => {
                return <RecipeCard key = {recipe.id} id = {recipe.id} title = {recipe.title} url = {recipe.url} details = {recipe.nutrition} cookbook = {true} />
            })
            
            return [...updater]
        })
        }
        
    }, [recipes])


    
    return <>
    <h1>Saved Meals</h1>
    {recipeArray ? recipeArray :  <h1>No Recipes Added</h1> }
    
    
    </>



}

export default CookBook;