import React, { useState , useEffect } from "react";
import {Link} from "react-router-dom"

//CSS from https://codepen.io/alexpopovich/pen/weMgMJ

function RecipeCard({ id , title , url , addRecipe , details , cookbook}){

    const apiKey = "c7d05118b4bd43739598790d73ed2abb"
    const [nutritionInfo, setNutritionInfo] = useState({calories: 'loading', protein: 'loading', fat: 'loading', carbs: 'loading'})
    const [recipeInfo, setRecipeInfo] = useState({id: id, title: title, url: url})
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])  
    const viewRecipeCSS = {

      display: 'block' ,
        background: '#EF3E36' ,
        color: '#fff' ,
        position: 'absolute' ,
        letterSpacing: '0.1em',
        textAlign: 'center' ,
        padding: '10px' ,
        width: '100%' ,
        height: '8%' , 
        fontFamily: 'cursive'
  }

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

function handleDeleteRecipe(e){
  const recipeId = e.target.parentNode.parentNode.id
  fetch(`http://localhost:3000/cookbook/${recipeId}`, {
    method: "DELETE"
  })
  .then(() => [
    window.location.reload()
  ])
  
}



    return(
        <div id = {id} className = "card" >

            <div className = "recipeDetails">
            <h1 style = {{fontSize: '25px'}}>{title}</h1>
            <button style = {{width: '10%' , textAlign: 'center' , position: 'absolute' , right: '0px' , top: '0px' , color: '#fff' , background: '#EF3E36' }} onClick = {handleDeleteRecipe}>X</button>
            <img src = {url} alt = {title}></img>
            <div>
              <p style = {{fontFamily: 'cursive'}} >Per Serving</p>
               <ul style = {{fontFamily: 'cursive'}}>
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
            {!cookbook ? <button onClick={handleAddRecipe} style = {viewRecipeCSS}>Add to Cookbook</button> : <Link to = {`/cookbook/${id}`} style = {{textDecoration: 'none'}}> <button type = "button" style = {viewRecipeCSS}> View Recipe</button> </Link>}

        </div>
    )
}

export default RecipeCard