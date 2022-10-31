import React , {useState , useEffect} from "react";
import RecipeCard from "./RecipeCard";


function CookBook({cookbookRecipes}){
    const [recipes, setRecipes] = useState(cookbookRecipes)
    const [recipeArray, setRecipeArray] = useState([])

    useEffect(() =>{
        
        if(recipes !== undefined){
         
            setRecipeArray((recipeArray) =>{
            const updater = recipes.map((recipe) => {
                return <RecipeCard key = {recipe.id} recipeObj = {recipe} cookbook = {true} />
            })
            
            return [...updater]
        })
        }
        
    }, [recipes])


    
    return <>
    <h1 style={{fontFamily: 'Papyrus, fantasy'}}>Saved Meals</h1>
    {recipeArray ? <div style={{display: 'grid' , gridTemplateColumns: '33% 33% 33%' , gridAutoRows: '550px' , gridGap: '40px 20px'}}> {recipeArray}</div> :  <h1>No Recipes Added</h1> }
    
    
    </>



}

export default CookBook;