import React, { useEffect , useState } from 'react';
import { useParams } from "react-router-dom";


function RecipePage(){
    const [recipe, setRecipe] = useState(null)
    const params = useParams()
    const [instructions, setInstructions] = useState(null)
    const [ingredients, setIngredients] = useState([])
  

    useEffect(() =>{
        fetch(`http://localhost:3000/cookbook/${params.id}`)
        .then((r) => r.json())
        .then((data) => {
            
            setRecipe(data)
            makeInstructions(data)
            makeIngredients(data)
            console.log(data)
        })
        .catch(console.log)
    }, [params.id])
    

    function makeInstructions(data){
       
        const stepsArray = data.instructions[0][0].steps
        console.log(stepsArray)
        
        const stepTags = stepsArray.map((step) => {
            return <li key = {data.id + 'step' + step.number}>{step.step}</li>
        })
        setInstructions(stepTags)
    }

    function makeIngredients(data){
        const ingredientObj = data.ingredients
        const ingredientNames = Object.keys(ingredientObj)
        const ingredientTags = ingredientNames.map((ingredient) => {

            return <li>{ingredientObj[ingredient]}  {ingredient}</li>

        })
        setIngredients(ingredientTags)
    }


    return <div className = 'recipepage' style = {{position: 'relative' , border: '5px solid ' , margin: '30px' , backgroundColor: '#FAF9F6' , height: '85vh' , fontFamily :'Papyrus, fantasy'}}>
        {recipe? <img src = {recipe.url} alt = {recipe.title}></img> : <p>Loading Picture</p>}
        <ol>{instructions ? instructions : <></>}</ol>
        <ul>{recipe ? <>
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
                     </>: <p>Nutrition Info Loading</p>}
        </ul>
        <ul>
            {ingredients? ingredients : <p>Ingredients loading</p>}

        </ul>
    </div>
}

export default RecipePage