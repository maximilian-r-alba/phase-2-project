import React, { useState } from 'react';
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

  const handleRecipes = (recipeList) =>{
    setRecipes(recipeList)
  }

  const [page, setPage] = useState("/")

  return (
    <>
    <NavBar onChangePage={setPage} />
    
    <Routes>
      
      <Route path="/" 
      element = {<Search setRecipes = {setRecipes} recipes= {recipes} apiKey = {apiKey}/>}/>
      <Route path="/cookBook" 
      element = {<CookBook apiKey = {apiKey}/>}/>
      <Route path = "/cookBook/:id"
      element = {<RecipePage/>}/>
      <Route path="/mealplan" 
      element = {<MealPlan apiKey = {apiKey} mealPlan = {mealPlan} setMealPlan = {setMealPlan}/>}/>
     
    </Routes>
    
    </>
  
  );
}

export default App;
