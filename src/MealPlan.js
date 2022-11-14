import { useEffect , useState }from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

function MealPlan({mealPlan , setMealPlan , recipes , calculator}){
    
    const [options,setOptions] = useState()
    


    const defaultValue = {day: 'monday', mealTime: 'breakfast', recipe: null , servingSize: '1'}

    const [formValues, setFormValues] = useState(defaultValue)
    
    useEffect(()=>{
        if(recipes.length !== 0){
            setOptions(() => {
                const updater = recipes.map((recipe) => {
                    return <option key = {recipes.indexOf(recipe)} id = {recipe.id} value = {recipe.id}>{recipe.title}</option>
                })
                return updater
            })
          
            setFormValues({...formValues, recipe: recipes[0].id})
        }
        else{
            setOptions(<option>No Recipes Available</option>)
            setFormValues({...formValues, recipe: 'No Recipes Available'})
        }
        
    }, [recipes])

    function addMeal(e){
        e.preventDefault()
        
        const {day, mealTime, recipe: formRecipeID, servingSize} = formValues
   
        const targetTime = JSON.parse(JSON.stringify(mealPlan[day][mealTime]))
    
        const plannedIDs = targetTime.map((meal) => {
            return meal.id
        })


        const addedRecipe = recipes.filter((recipe) => recipe.id === formRecipeID).pop()

        if(plannedIDs.includes(addedRecipe.id)){
            
            setMealPlan((mealPlan) => {
                
                const remover = [...targetTime].filter((meal) => meal.id !== addedRecipe.id)
                const updater = [...targetTime].filter((meal) => meal.id === addedRecipe.id).pop()
             
                updater.servings = updater.servings + parseInt(servingSize)
                remover.push(updater)
                return {...mealPlan, [day]: {...mealPlan[day], [mealTime]: remover}}
            })
        }
        else{
           
            addedRecipe.servings = parseInt(servingSize)
            setMealPlan((mealPlan) => {
                return {...mealPlan, [day]: {...mealPlan[day], [mealTime]: [...mealPlan[day][mealTime] , addedRecipe]}}
            })
        }
       
        const totalObj = calculator(day , addedRecipe , servingSize)
        setMealPlan((mealPlan) => {
            return {...mealPlan, [day]: {...mealPlan[day], ['total'] : totalObj}}
        })

       
    }



    function handleChange(e){
        const key = e.target.className
        const value = e.target.value
       

        if(key === 'recipe' || key === 'servingSize'){
            
            setFormValues((formValues) =>{
                return {...formValues, [key]: parseInt(value)}
                })
        }
        else{
         
            setFormValues((formValues) =>{
        return {...formValues, [key]: value}
        })}
        
    }

return (
    <>
<div className = "mealplan">
    
    <form onSubmit = {addMeal}>
        <div style = {{margin: '20px'}}>
        <input onChange={handleChange} id = 'monday' className='day' type = 'radio' name = 'weekday' value = 'monday' defaultChecked></input>
        <label htmlFor = 'monday'>Monday</label>
        <br></br>

        <input onChange={handleChange} id = 'tuesday' className= 'day' type = 'radio' name = 'weekday' value = 'tuesday'></input>
        <label htmlFor = 'tuesday'>Tuesday</label>

        <input onChange={handleChange} id = 'wednesday' className='day' type = 'radio' name = 'weekday' value = 'wednesday'></input>
        <label htmlFor = 'wednesday'>Wednesday</label>
        <br></br>
        
        <input onChange={handleChange} id = 'thursday' className= 'day' type = 'radio' name = 'weekday' value = 'thursday'></input>
        <label htmlFor = 'thursday'>Thursday</label>

        <input onChange={handleChange} id = 'friday' className= 'day' type = 'radio' name = 'weekday' value = 'friday'></input>
        <label htmlFor = 'friday'>Friday</label>
        </div>
        
        <div>
        <select onChange={handleChange} className='mealTime' >
            <option value = "breakfast">Breakfast</option>
            <option value = "lunch">Lunch</option>
            <option value = "dinner">Dinner</option>
        </select>
        
        <select onChange={handleChange} className='recipe'>{options}</select>
        <input type = 'number' onChange={handleChange} className = 'servingSize' defaultValue={1}></input>
        {recipes.length > 0 ? <input type = 'submit' value = "Add Meal"></input> : <input disabled  type = 'submit' value = "Add Meal"></input>}
        </div>
       
    </form>
    <div>
        <Link to ="">Weekly Overview</Link>
        <Link to ="monday">Monday</Link>
        <Link to ="tuesday">Tuesday</Link>
        <Link to ="wednesday">Wednesday</Link>
        <Link to ="thursday">Thursday</Link>
        <Link to ="friday">Friday</Link>
    </div>
</div>
<Outlet/>
</>
)}

export default MealPlan

