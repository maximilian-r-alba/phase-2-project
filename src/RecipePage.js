import React, { useEffect , useState } from 'react';
import { useParams } from "react-router-dom";

function RecipePage(){
    const [recipe, setRecipe] = useState(null)
    const params = useParams()
    const [instructions, setInstructions] = useState(null)
    const [ingredients, setIngredients] = useState([])
    console.log(params)

    useEffect(() =>{
        fetch(`http://localhost:3000/cookbook/${params.id}`)
        .then((r) => r.json())
        .then((data) => setRecipe(data))
    }, [params.id])

    console.log(recipe)
    useEffect(() => {
        if (recipe != null){
            for (const [key ,value] of Object.entries(recipe.ingredients)){
            setIngredients((ingredients) => {
                const ingredient = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
                
                return [...ingredients , <p>{value} {ingredient}</p>]
            })
        }
        setInstructions(recipe.instructions.split(/\r?\n/).map(((step , index) => {
            return <li key = {index} >{step}</li>
        })))
    }
}, [recipe])
    


console.log(ingredients)
console.log(instructions)
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