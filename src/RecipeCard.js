import React, { useState , useEffect } from "react";
import './RecipeCard.css'
//CSS from https://codepen.io/alexpopovich/pen/weMgMJ

function RecipeCard({ id , title , url , addRecipe , details , cookbook}){

    const apiKey = "c7d05118b4bd43739598790d73ed2abb"
    const [nutritionInfo, setNutritionInfo] = useState({calories: 'loading', protein: 'loading', fat: 'loading', carbs: 'loading'})
    const [recipeInfo, setRecipeInfo] = useState({id: id, title: title, url: url})
    const [ingredients, setIngredients] = useState([])
    
  
  useEffect(() => {
    

    if(details === undefined){
      console.log(details)
      console.log('details undefined?, ', details)
      fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`)
      .then((r) => r.json())
      .then((data) => {
        
        setNutritionInfo((nutritionInfo) => {
          
          const nutrition = data.nutrition.nutrients.map((nutrient) =>{

            return [
              nutrient.name , `${nutrient.amount} ${nutrient.unit}`
            ]
          })
          
          const nutrition2 = Object.fromEntries(nutrition)

              return {...nutritionInfo , calories: nutrition2.Calories, carbs: nutrition2.Carbohydrates, fat: nutrition2.Fat, protein: nutrition2.Protein, servings: data.servings}

        })

        setIngredients((ingredients) => {

              const ingredientArray = Object.fromEntries(data.extendedIngredients.map((ingredient) =>
            {
                      return [
                        ingredient.name , `${ingredient.amount} ${ingredient.unit}`
                      ]

                    }))

                      return ingredientArray

            })

          setRecipeInfo((recipeInfo) =>{
              return {...recipeInfo, nutrition: nutritionInfo , ingredients: ingredients, instructions: data.instructions , summary: data.summary}
            })
     })
    }
    
    else{
   
      setNutritionInfo(details)
    }
  }, [])


  
function handleAddRecipe(){
  console.log('post')
  
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
            {!cookbook ? <button onClick={handleAddRecipe}>Add to Cookbook</button> : <button onClick={null}>View Recipe</button>}

        </div>
    )
}

export default RecipeCard