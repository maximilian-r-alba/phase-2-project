import React , {useState , useEffect} from "react";
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
        
        if(recipes !== undefined){
         
            setRecipeArray((recipeArray) =>{
            const updater = recipes.map((recipe) => {
                return <RecipeCard key = {recipe.id} id = {recipe.id} title = {recipe.title} url = {recipe.url} details = {recipe.nutrition} cookbook = {true} />
            })
            
            return [...updater]
        })
        }
        
    }, [recipes])


    
    return <>
    <h1 style={{fontFamily: 'Papyrus, fantasy'}}>Saved Meals</h1>
    {recipeArray ? <div style={{display: 'grid' , gridTemplateColumns: '33% 33% 33%' , gridAutoRows: 'minmax(0, auto)' , gridGap: '40px 20px'}}> {recipeArray}</div> :  <h1>No Recipes Added</h1> }
    
    
    </>



}

export default CookBook;