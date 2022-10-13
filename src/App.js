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
  

  const [page, setPage] = useState("/")
  const [macros, setMacros] = useState({protein: 0 , fat: 0 , carbs: 0 , calories: 0})

  function handleMacros(e){
    const name = e.target.name
    const value = parseInt(e.target.value)
   
      setMacros((macros) => {
        return {...macros, [name]:value}
      })
    
  }
  

  return (
    <>
    <NavBar onChangePage={setPage} />
    <form style = {{display: 'none'}}>
    <label>

      Target Daily Macros
      <br></br>

      <label style={{marginRight:'5px'}}>Calories
        <input onChange= {handleMacros} name = "calories" type = "number" style={{width: "50px" , marginLeft: "30px" , textAlign: 'right' }} value = {macros.calories}></input>
      </label>
        <br></br>

      <label style={{marginRight:'5px'}}>Protein 
        <input onChange= {handleMacros} name = "protein" type = "number" style={{width: "50px" , marginLeft: "30px" , textAlign: 'right'}} value = {macros.protein}></input> 
      </label>

      <br></br>

      <label style={{marginRight:'5px'}} >Fats
        <input onChange= {handleMacros} name = "fat" type = "number" style={{width: "50px" , marginLeft: "30px" , textAlign: 'right'}} value = {macros.fat}></input>
      </label>
      
      <br></br>
      
      <label style={{marginRight:'5px'}}>Carbs
        <input onChange= {handleMacros} name = "carbs" type = "number" style={{width: "50px" , marginLeft: "30px" , textAlign: 'right' }} value = {macros.carbs}></input>
      </label>
    </label>

    </form>
    <Routes>
      
      <Route path="/" 
      element = {<Search apiKey = {apiKey}/>}/>
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
