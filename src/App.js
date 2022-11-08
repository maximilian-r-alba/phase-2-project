import React, { useState , useEffect } from 'react';
import {Routes , Route} from "react-router-dom"
import Search from './Search';
import NavBar from './NavBar';
import CookBook from './Cookbook';
import RecipePage from './RecipePage'
import MealPlan from './MealPlan';
import {API_KEY} from './config.js'
import MealTable from './MealTable';



function App() {
  
  
  const [mealPlan, setMealPlan] = useState({
    monday: {breakfast:[], lunch: [], dinner: [], total: {carbs: 0, protein: 0, fat: 0, calories: 0}}, 
    tuesday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
    wednesday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
    thursday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
    friday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}}
})

  const [recipes, setRecipes] = useState([]) 
  const [cookbookRecipes, setCookbookRecipes] = useState([])
  

  useEffect(() => {
    fetch("http://localhost:3000/cookbook")
    .then(res => res.json())
    .then(savedRecipes => setCookbookRecipes(savedRecipes))
  }, [])

  function handleRecipes(recipeArray , recipeObj){
    setRecipes(recipeArray)
    if(recipeObj) setCookbookRecipes([recipeObj, ...cookbookRecipes])
  }

  function handleDeleteRecipe(e){
    const targetRecipeId = parseInt(e.target.parentNode.id)
    
    const filteredList = cookbookRecipes.filter(recipe => {
        
        return recipe.id !== targetRecipeId
    })
    
    fetch(`http://localhost:3000/cookbook/${targetRecipeId}`, {
      method: "DELETE"
    })
    .then(() => {
      setCookbookRecipes(filteredList)
  })
    
  }

  function calculator(day, recipe, servingSize, removed){
      
    const totalObj = mealPlan[day]['total']
    let multiplier = servingSize
   
    if(removed){
      multiplier = multiplier*-1
    }

    for (const macro of Object.keys(totalObj)){
        
        if(macro === 'calories'){
            totalObj[macro] = totalObj[macro] + (parseFloat(recipe.nutrition[macro].slice(0, -4)) * multiplier)
        }
        else{
            totalObj[macro] = totalObj[macro] + (parseFloat(recipe.nutrition[macro].slice(0, -2))* multiplier)
        }
        
    }
    return totalObj
}

function removeFromMealPlan(e){
  const id = parseInt(e.target.parentNode.parentNode.id)
  const mealTime = e.target.parentNode.parentNode.parentNode.id
  const day = e.target.parentNode.parentNode.parentNode.parentNode.id.slice(0,-5)
  const removedRecipe = mealPlan[day][mealTime].filter((recipe) => recipe.id === id).pop()
  const servingSize = removedRecipe.servings
  const totalObj = calculator(day, removedRecipe, servingSize , true)
  const mealPlanFilter = mealPlan[day][mealTime].filter((recipe) => recipe.id !== id)

  console.log(mealPlanFilter)
  
  setMealPlan((mealPlan) => {
    return {...mealPlan, [day]: {...mealPlan[day], [mealTime] : mealPlanFilter , ['total'] : totalObj}}
  })
  // setMealPlan((mealPlan) => {
      
  //     const jsxUpdater = mealPlan[day][mealTime].filter((meal) =>{
  //         return meal[0].props.id != id
  //     })

  //     return {...mealPlan, [day]: {...mealPlan[day], [mealTime]: jsxUpdater,
          
  //     ['total']: {...mealPlan[day]['total'],
          
  //     carbs: parseFloat(mealPlan[day]['total'].carbs) - (multiplier*parseFloat(removedRecipe[0].nutrition.carbs)),

  //     protein: parseFloat(mealPlan[day]['total'].protein) - (multiplier*parseFloat(removedRecipe[0].nutrition.protein)),  

  //     fat: parseFloat(mealPlan[day]['total'].fat) - (multiplier*parseFloat(removedRecipe[0].nutrition.fat)), 

  //     calories: parseFloat(mealPlan[day]['total'].calories) - (multiplier*parseFloat(removedRecipe[0].nutrition.calories))}}
  //         }
  //     })       
}
console.log(mealPlan)
  return (
    <>
    <NavBar  />

    <Routes>
      
      <Route path="/" element = {<Search handleRecipes = {handleRecipes} recipes= {recipes} apiKey = {API_KEY}/>}/>

      <Route path="/cookBook" element = {<CookBook setCookbookRecipes = {setCookbookRecipes} cookbookRecipes = {cookbookRecipes} handleDeleteRecipe = {handleDeleteRecipe}/>}/>

      <Route path = "/cookBook/:id" element = {<RecipePage />}/>

      <Route path="/mealplan" element = {<MealPlan calculator = {calculator}recipes = {cookbookRecipes} mealPlan = {mealPlan} setMealPlan = {setMealPlan}/>}>
        <Route path = ":day" element = {<MealTable mealPlan={mealPlan} removeFromMealPlan={removeFromMealPlan} key = {'monday'} day = {'monday'}/>}/>
        <Route path = ":day" element = {<MealTable mealPlan={mealPlan} removeFromMealPlan={removeFromMealPlan} key = {'tuesday'} day = {'tuesday'}/>}/>
        <Route path = ":day" element = {<MealTable mealPlan={mealPlan} removeFromMealPlan={removeFromMealPlan} key = {'wednesday'} day = {'wednesday'}/>}/>
        <Route path = ":day" element = {<MealTable mealPlan={mealPlan} removeFromMealPlan={removeFromMealPlan} key = {'thursday'} day = {'thursday'}/>}/>
        <Route path = ":day" element = {<MealTable mealPlan={mealPlan} removeFromMealPlan={removeFromMealPlan} key = {'friday'} day = {'friday'}/>}/>
      </Route>
      </Routes>
    
    </>
  
  );
}

export default App;
