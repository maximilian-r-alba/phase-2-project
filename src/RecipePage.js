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
        // setInstructions(recipe.instructions.split(/\r?\n/).map(((step , index) => {
        //     return <li key = {index} >{step}</li>
        // })))
        // setInstructions( <p textContent = {recipe.instructions}></p>)
    }
}, [recipe])
    



    return <>
    <ul>
        {ingredients}
    </ul>
    <ol>
        {instructions}
    </ol>

    </>
}

export default RecipePage