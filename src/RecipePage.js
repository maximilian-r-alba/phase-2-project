import React, { useEffect , useState } from 'react';
import { useParams } from "react-router-dom";
import './RecipePage.css'

function RecipePage(){
    const [recipe, setRecipe] = useState(null)
    const params = useParams()
    const [instructions, setInstructions] = useState(null)
    const [ingredients, setIngredients] = useState([])
    const [nutrition, setNutrition] = useState()

    useEffect(() =>{
        fetch(`http://localhost:3000/cookbook/${params.id}`)
        .then((r) => r.json())
        .then((data) => setRecipe(data))
    }, [params.id])

    
    useEffect(() => {
        
        if (recipe != null){
           const instructionUpdater = []
            for (const element of recipe.instructions){
                for (const step of element.steps){
                    instructionUpdater.push(step.step)
                }
            }
            setInstructions(instructionUpdater.map((step , index) => {
                return <li key = {index}> {step} </li>
            }))

            for (const [key ,value] of Object.entries(recipe.ingredients)){
                
            setIngredients((ingredients) => {
                const ingredient = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
                
                return [...ingredients , <p>{value} {ingredient}</p>]
            })
        }
            setNutrition((nutrition) =>{
              return  recipe.nutrition
            })
        // setInstructions(recipe.instructions.split(/\r?\n/).map(((step , index) => {
        //     return <li key = {index} >{step}</li>
        // })))
        // setInstructions( <p textContent = {recipe.instructions}></p>)
    }
}, [recipe])
    

console.log(recipe)

    return <div className = 'recipepage'>
        {recipe?
        <>
        <h1 style = {{textAlign: 'center' , fontSize: '40px'}}>{recipe.title}</h1>

        <img style = {{display: 'block', marginLeft: 'auto' , marginRight: 'auto' , left: '50%' , width: '400px' , border: '10px solid #993300' , padding: '0px'}} src={recipe.url}></img>

        </>
        : <p>Loading</p>}
        {nutrition? 
        <>
            <p style= {{display: 'inline-block' , position: 'absolute' , right: '380px' , top: '330px' }}>Total Servings: {recipe.nutrition.servings}</p>
            <p style = {{position: 'absolute' , right: '350px' , top: '170px',textAlign: 'center' , fontWeight: 'bold' , fontSize: '20px' , display: 'inline-block'}}>Macros per Serving:</p>
            <ul style = {{ position: 'absolute' , top: '200px' , right: '370px' ,textAlign: 'center' , listStyle: 'none', display: 'inline-block'}}>
                    <li>
                    Calories: {recipe.nutrition.calories}
                    </li>
                    <li>
                    Protein: {recipe.nutrition.protein}
                    </li>
                    <li>
                    Carbs: {recipe.nutrition.carbs}
                    </li>
                    <li>
                    Fat: {recipe.nutrition.fat}
                    </li>
                </ul> 
        </>       
                : <p>No information available</p>}
    
    <ul style= {{display: 'inline-block' , position: 'absolute' , top: '150px' , left: '150px', textAlign: 'left' , columnCount: '2' , columnFill:'balance' }}>
        {ingredients}
    </ul>
    
    
    
    <ol style ={{display: 'inline-block' , position: 'absolute' , left: '550px' , top: '550px' , fontSize: '20px'}}>
        {instructions}
    </ol>

    </div>
}

export default RecipePage