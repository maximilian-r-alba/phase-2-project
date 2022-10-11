import React, { useEffect , useState } from 'react';
import { useParams } from "react-router-dom";


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
    }
}, [recipe])
    

console.log(recipe)

    return <div className = 'recipepage' style = {{position: 'relative' , border: '5px solid ' , margin: '30px' , backgroundColor: '#FAF9F6' , height: '85vh' , fontFamily :'Papyrus, fantasy'}}>
        {recipe?
        <>
        <h1 style = {{textAlign: 'center' , fontSize: '40px'}}>{recipe.title}</h1>

        <img style = {{display: 'inline-block', marginLeft: 'auto' , position: 'absolute' , marginRight: 'auto' , left: '36%' , width: '400px' , border: '10px solid #993300' , padding: '0px'}} src={recipe.url} alt = {`${recipe.title}`}></img>

        </>
        : <p>Loading</p>}
        {nutrition? 
        <>
            <p style= {{display: 'inline-block' , position: 'absolute' , right: '290px' , top: '270px' , fontSize: '25px' , fontWeight: 'bold' }}>Total Servings: {recipe.nutrition.servings}</p>
            <p style = {{position: 'absolute' , right: '270px' , top: '100px',textAlign: 'center' , fontWeight: 'bold' , fontSize: '25px' , display: 'inline-block'}}>Macros per Serving:</p>
            <ul style = {{ position: 'absolute' , top: '150px' , right: '300px' ,textAlign: 'center' , listStyle: 'none', display: 'inline-block' , fontSize: '20px'}}>
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
    
    <ul style= {{display: 'inline-block' , position: 'absolute' , top: '100px' , left: '20px', textAlign: 'left' , columnCount: '2' , columnFill:'balance' , fontSize: '100%' , maxHeight:'80%' , columnWidth: '20px' , paddingLeft: '0px'}}>
        {ingredients}
    </ul>
    
    
    
    <ol style ={{display: 'inline-block' , position: 'absolute' , bottom: '0px' , left: '600px' , fontSize: '20px' , padding: '30px' , maxWidth: '50%'}}>
        {instructions}
    </ol>

    </div>
}

export default RecipePage