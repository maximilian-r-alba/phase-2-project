import React, { useState , useEffect } from "react";
import './RecipeCard.css'
//CSS from https://codepen.io/alexpopovich/pen/weMgMJ

function RecipeCard({ id , title , url , addRecipe , macros}){

    const apiKey = "c7d05118b4bd43739598790d73ed2abb"
    const [nutritionInfo, setNutritionInfo] = useState({calories: 'loading', protein: 'loading', fat: 'loading', carbs: 'loading'})
    const recipeInfo = {id: id, title: title, url: url}

  useEffect(() => {
    console.log('use effect')
    if(macros === undefined){
      console.log('fetch')
      fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setNutritionInfo((nutritionInfo) => {
          
          return {calories: data.calories, carbs: data.carbs, fat: data.fat, protein: data.protein}
        })
      })
    }
    else{
      setNutritionInfo(macros)
    }
  }, [])


function handleAddRecipe(){
  
  recipeInfo['nutrition'] = {...nutritionInfo}
  fetch('http://localhost:3001/cookbook', {
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
            <button onClick={handleAddRecipe}>Add to Cookbook</button>

        </div>
    )
}

export default RecipeCard