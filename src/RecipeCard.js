import React, { useState , useEffect} from "react";
import {Link} from "react-router-dom"

function RecipeCard({ recipeObj:{ id , title , url} , recipeObj , addRecipe , cookbook , handleDeleteRecipe}){

  
    const apiKey = "c7d05118b4bd43739598790d73ed2abb"
    const [recipeInfo, setRecipeInfo] = useState({...recipeObj})


    useEffect(() => {
    

      if(cookbook !== true){
  
        fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`)
          .then((r) => r.json())
          .then((data) => setRecipeInfo({...recipeInfo , instructions:[data]}))
  
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`)
          .then((r) => r.json())
          .then((data) => {
      
            
            setRecipeInfo((recipeInfo) => {

              const nutritionArray = data.nutrition.nutrients.map((nutrient) =>{
  
                return [
                  nutrient.name , `${nutrient.amount} ${nutrient.unit}`
                ]
              })
              
              const nutritionObj = Object.fromEntries(nutritionArray)
              
                  return {...recipeInfo, nutrition : {calories: nutritionObj.Calories, carbs: nutritionObj.Carbohydrates, fat: nutritionObj.Fat, protein: nutritionObj.Protein, servings: data.servings}}
  
            })
  
  
          setRecipeInfo((recipeInfo) => {
  
                const ingredientObj = Object.fromEntries(data.extendedIngredients.map((ingredient) =>
              {
                        return [
                          ingredient.name , `${ingredient.amount} ${ingredient.unit}`
                        ]
  
                      }))
  
                        return {...recipeInfo , ingredients: ingredientObj}
  
              })
  
            setRecipeInfo((recipeInfo) =>{
                return {...recipeInfo, summary: data.summary}
              })
       })
       

      }
      
      else{
        
        setRecipeInfo(recipeObj)
      }
  
    }, [])


function handleAddRecipe(){
  

    fetch('http://localhost:3000/cookbook', {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({...recipeInfo})})
      .then((r) => r.json())
      .then((data) => console.log(data))
      
    
    addRecipe(recipeInfo)
  
  }
  


    return(

      <div id = {id} >

          <h1 >{title}</h1>
          {cookbook ? <button onClick = {handleDeleteRecipe}>X</button> : null}
          <img src = {url} alt = {title}></img>
              <div >
                <p >Per Serving</p>
                  {recipeInfo.nutrition ? <ul>
                      <li>
                      Calories: {recipeInfo.nutrition.calories}
                      </li>
                      <li>
                      Protein: {recipeInfo.nutrition.protein}
                      </li>
                      <li>
                      Carbs: {recipeInfo.nutrition.carbs}
                      </li>
                      <li>
                      Fat: {recipeInfo.nutrition.fat}
                      </li>
                  </ul> : <p>Recipe Nutrition Information is Loading, Try a Reload</p>}
          
              </div>
          {cookbook ? <Link to = {`/cookbook/${id}`} > <button type = "button" > View Recipe</button> </Link>  : <button onClick={handleAddRecipe} >Add to Cookbook</button>}

        </div>
    )
}

export default RecipeCard