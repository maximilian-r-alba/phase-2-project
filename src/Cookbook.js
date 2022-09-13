import React , {useState , useEffect} from "react";
import RecipeList from "./RecipeList";
import RecipeCard from "./RecipeCard";

function CookBook(){
    const [recipes, setRecipes] = useState()
    const [recipeArray, setRecipeArray] = useState()

    
    useEffect(() => {
        console.log('use effect 1')
        fetch("http://localhost:3000/cookbook")
    .then((r) => r.json())
    .then((data) => {
        console.log('set recipes')
        setRecipes(data)
    })
    },[])

    useEffect(() =>{
        console.log('use effect 2 ', recipes)
        if(recipes != undefined){
          console.log('recipes here')
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
    {!recipeArray ? <h1>No Recipes Added</h1> : recipeArray}
    
    
    </>



}

export default CookBook;