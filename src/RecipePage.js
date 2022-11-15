import React, { useEffect , useState , useRef} from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

function RecipePage(){
    const [recipe, setRecipe] = useState(null)
    const params = useParams()
    const [instructions, setInstructions] = useState(null)
    const [ingredients, setIngredients] = useState([])
    const pageRef = useRef()

    useEffect(() =>{
        fetch(`http://localhost:3000/cookbook/${params.id}`)
        .then((r) => r.json())
        .then((data) => {
            
            setRecipe(data)
            makeInstructions(data)
            makeIngredients(data)
            
        })
        .catch(console.log)
    }, [params.id])

    useEffect(()=> {
        if(pageRef.current)
        {
            pageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
       
    }, [recipe])
    

    function makeInstructions(data){
       
        const stepsArray = data.instructions[0][0].steps
        
        const stepTags = stepsArray.map((step) => {
            return <li key = {data.id + 'step' + step.number}>{step.step}</li>
        })
        setInstructions(stepTags)
    }

    function makeIngredients(data){
        const ingredientObj = data.ingredients
        const ingredientNames = Object.keys(ingredientObj)
        const ingredientTags = ingredientNames.map((ingredient) => {

            return <li key = {ingredient}>{ingredientObj[ingredient]}  {ingredient}</li>

        })
        setIngredients(ingredientTags)
    }


    return <>{ recipe ? <Card ref = {pageRef} className = 'recipepage'>
        <h1>{recipe.title}</h1>
        <img src = {recipe.url} alt = {recipe.title}></img> 
        <ul id = "ingredients">
            {ingredients? ingredients : <p>Ingredients loading</p>}
        </ul>
        <ul>
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
       
        <ol >{instructions ? instructions : <h1>Loading Recipe</h1>}</ol>
        
      
    </Card> : <></>}
    </>
}

export default RecipePage

const Card = styled.div `
background-color: #f7f4e6;
font-family: 'Kalam', cursive;
color: #551A8B;
border: dotted #551A8B;
min-height: 500;
width: 100vw;
position: relative;

img{

}
ul#ingredients{
    
    column-count:3;
    column-fill: balance;
    column-gap: 40px;
    position: absolute;
    top: 80px;
    left: 30%;
}
ol{
    column-count:auto;
    column-fill: balance;
    column-gap: 40px;
    column-width: 50vw;
}
`
