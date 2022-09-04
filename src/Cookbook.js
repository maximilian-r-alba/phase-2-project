import React , {useState , useEffect} from "react";
import RecipeList from "./RecipeList";
import RecipeCard from "./RecipeCard";

function CookBook(){
    const [recipes, setRecipes] = useState()
    const [recipeArray, setRecipeArray] = useState()

    console.log("cookbook load")
    useEffect(() => {
        fetch("http://localhost:3001/cookbook")
    .then((r) => r.json())
    .then((data) => setRecipes(data))
    },[])

    useEffect(() =>{
        if(recipes != undefined){
            console.log('recipe array')
            setRecipeArray((recipeArray) =>{
            const updater = recipes.map((recipe) => {
                return <RecipeCard key = {recipe.id} id = {recipe.id} title = {recipe.title} url = {recipe.url} macros = {recipe.nutrition} />
            })
            console.log(updater)
            return [...updater]
        })
        }
        
    }, [recipes])

    console.log('after load ', recipeArray)
    
    return <>
    <h1>Saved Meals</h1>
    {recipeArray ? recipeArray
     : <h1>No Recipes Added</h1>}
    
    </>



}

export default CookBook;