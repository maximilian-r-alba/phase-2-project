import React, { useState , useEffect} from "react";
import styled from "styled-components";
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

      <Card id = {id} >

          <h1 >{title}</h1>
          {cookbook ? <button className="removeBtn" onClick = {handleDeleteRecipe}>X</button> : null}
          <img src = {url} alt = {title}></img>
              <div className="nutrition">
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
          {cookbook ? <Link to = {`/cookbook/${id}`} > <button className = "viewRecipe" type = "button" > View Recipe</button> </Link>  : <button onClick={handleAddRecipe} >Add to Cookbook</button>}

        </Card>
    )
}

export default RecipeCard


const Card = styled.div `
background-color: #f7f4e6;
color: #551A8B;
font-family: 'Kalam', cursive;
position: relative;
border: 2px solid #551A8B;
width: 500px;
height: 500px;

div.nutrition{
  position: absolute;
  bottom: 40px;
  right: 150px;
  width: 200px;
}

img{
  width: 50%;
  margin: auto;
  display: block;
  position: relative;
  top: 20%;
  
}
h1{
  position: absolute;
  left: 20px

}
button{
  color: #551A8B;
  border: 2px solid #551A8B;
  border-radius: 15px;
  background-color: #AAC6E6;
}

button.viewRecipe{
  width: 200px;
  position: absolute;
  bottom: 30px;
  right: 150px;

}

button.removeBtn{
  position: absolute;
  right: 10px;
  top: 10px;
}
`