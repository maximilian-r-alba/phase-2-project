import React, { useState , useEffect } from 'react';
import {Routes , Route} from "react-router-dom"
import Search from './Search';
import NavBar from './NavBar';
import CookBook from './Cookbook';
import RecipePage from './RecipePage'
import MealPlan from './MealPlan';


function App() {
  
  const apiKey =  "20743aca11a74bf5b68b217a5df2ac20"
  const [mealPlan, setMealPlan] = useState({
    monday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
    tuesday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
    wednesday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
    thursday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
    friday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}}
})
  const [recipes, setRecipes] = useState([]) 
  const [cookbookRecipes, setCookbookRecipes] = useState([])
  const [page, setPage] = useState("/")

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
    const targetRecipeId = parseInt(e.target.parentNode.parentNode.id)
    
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

  return (
    <>
    <NavBar onChangePage={setPage} />
    
    <Routes>
      
      <Route path="/" 
      element = {<Search handleRecipes = {handleRecipes} recipes= {recipes} apiKey = {apiKey}/>}/>
      <Route path="/cookBook" 
      element = {<CookBook setCookbookRecipes = {setCookbookRecipes} cookbookRecipes = {cookbookRecipes} handleDeleteRecipe = {handleDeleteRecipe} apiKey = {apiKey}/>}/>
      <Route path = "/cookBook/:id"
      element = {<RecipePage/>}/>
      <Route path="/mealplan" 
      element = {<MealPlan apiKey = {apiKey} mealPlan = {mealPlan} setMealPlan = {setMealPlan}/>}/>
     
    </Routes>
    
    </>
  
  );
}

export default App;
