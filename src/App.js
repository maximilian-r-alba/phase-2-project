import React, { useEffect, useState } from 'react';
import {Routes , Route} from "react-router-dom"
import Search from './Search';
import NavBar from './NavBar';
import CookBook from './Cookbook';
import RecipePage from './RecipePage'
import MealPlan from './MealPlan';

function App() {
  
  const apiKey =  "c7d05118b4bd43739598790d73ed2abb"
  

  const [page, setPage] = useState("/")
  const [macros, setMacros] = useState({protein: 0 , fat: 0 , carbs: 0 , calories: 0})

  function handleMacros(e){
    const name = e.target.name
    const value = parseInt(e.target.value)
   
      setMacros((macros) => {
        return {...macros, [name]:value}
      })
    
  }
  console.log(macros)
  return (
    <>
    <NavBar onChangePage={setPage} />
    <form>
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
      
      <Route path="/search" 
      element = {<Search apiKey = {apiKey}/>}/>
      <Route path="/cookBook" 
      element = {<CookBook apiKey = {apiKey}/>}/>
      <Route path = "/cookBook/:id"
      element = {<RecipePage/>}/>
      <Route path="/mealplan" 
      element = {<MealPlan apiKey = {apiKey}/>}/>
        
    </Routes>
    
    </>
  
  );
}

export default App;
