import React, { useState , useEffect } from "react";
import {Link} from "react-router-dom"
import './RecipeCard.css'
//CSS from https://codepen.io/alexpopovich/pen/weMgMJ

function RecipeCard({ id , title , url , addRecipe , details , cookbook}){

    const apiKey = "c7d05118b4bd43739598790d73ed2abb"
    const [nutritionInfo, setNutritionInfo] = useState({calories: 'loading', protein: 'loading', fat: 'loading', carbs: 'loading'})
    const [recipeInfo, setRecipeInfo] = useState({id: id, title: title, url: url})
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])  
  
  
  useEffect(() => {
    

    if(details === undefined){

      fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`)
    .then((r) => r.json())
    .then((data) => setInstructions(data))

      fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`)
      .then((r) => r.json())
      .then((data) => {
        
        setNutritionInfo((nutritionInfo) => {
          
          const nutritionArray = data.nutrition.nutrients.map((nutrient) =>{

            return [
              nutrient.name , `${nutrient.amount} ${nutrient.unit}`
            ]
          })
          
          const nutritionObj = Object.fromEntries(nutritionArray)
          
              return {...nutritionInfo , calories: nutritionObj.Calories, carbs: nutritionObj.Carbohydrates, fat: nutritionObj.Fat, protein: nutritionObj.Protein, servings: data.servings}

        })


        setIngredients((ingredients) => {

              const ingredientObj = Object.fromEntries(data.extendedIngredients.map((ingredient) =>
            {
                      return [
                        ingredient.name , `${ingredient.amount} ${ingredient.unit}`
                      ]

                    }))

                      return ingredientObj

            })

          setRecipeInfo((recipeInfo) =>{
              return {...recipeInfo, summary: data.summary}
            })
     })
    }
    
    else{
      
      setNutritionInfo(details)
    }
  }, [])

  
  useEffect(() =>{
    

    setRecipeInfo((recipeInfo) =>{
      return {...recipeInfo, nutrition: nutritionInfo, ingredients: ingredients, instructions: instructions}
    })
  }, [nutritionInfo])


function handleAddRecipe(){
  
  
  fetch('http://localhost:3000/cookbook', {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({...recipeInfo})})
    .then((r) => r.json())
    .then((data) => console.log(data))
  

  addRecipe(id)
}



    return(
        <div id = {id} className = "card" >

            <div className = "recipeDetails">
            <h1>{title}</h1>
            <img src = {url} alt = {title}></img>
            <div>
              <p>Per Serving</p>
               <ul>
                    <li>
                    Calories:{nutritionInfo.calories}
                    </li>
                    <li>
                    Protein:{nutritionInfo.protein}
                    </li>
                    <li>
                    Carbs:{nutritionInfo.carbs}
                    </li>
                    <li>
                    Fat:{nutritionInfo.fat}
                    </li>
                </ul>
            </div>
            </div>
            {!cookbook ? <button onClick={handleAddRecipe}>Add to Cookbook</button> : <Link to = {`/cookbook/${id}`} style = {{textDecoration: 'none'}}> <button type = "button"> View Recipe</button> </Link>}

        </div>
    )
}

export default RecipeCard