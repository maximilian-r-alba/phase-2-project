import React , { useEffect , useState }from "react";
import MealTable from "./MealTable";

function MealPlan({mealPlan , setMealPlan , recipes }){
    
    const [options,setOptions] = useState()
    

    const defaultValue = {day: 'monday',meal: 'breakfast', recipe: null , servingSize: '1'}

    const [formValues, setFormValues] = useState(defaultValue)


    
    useEffect(()=>{
        if(recipes.length !== 0){
            setOptions(() => {
                const updater = recipes.map((recipe) => {
                    return <option key = {recipes.indexOf(recipe)} id = {recipe.id} value = {recipe.title}>{recipe.title}</option>
                })
                return updater
            })
          
            setFormValues({...formValues, recipe: recipes[0].title})
        }
        else{
            setOptions(<option>No Recipes Available</option>)
            setFormValues({...formValues, recipe: 'No Recipes Available'})
        }
        
    }, [recipes])

    
    function addMeal(e){
        e.preventDefault()
       
        const selectedRecipe = recipes.filter((recipe) => {
            return recipe.title === formValues.recipe
        })
     
        const day = formValues.day
        const meal = formValues.meal

        const nutritionStats = selectedRecipe.map((recipe) =>{
            const multiplier = parseInt(formValues.servingSize)
            
            setMealPlan((mealPlan) => {
                return {...mealPlan , [day]: {...mealPlan[day], ['total']:{ ...mealPlan[day]['total'], 
                
                carbs: parseFloat(mealPlan[day]['total'].carbs) + (multiplier*parseFloat(recipe.nutrition.carbs)),

                protein: parseFloat(mealPlan[day]['total'].protein) + (multiplier*parseFloat(recipe.nutrition.protein)) , 

                fat: parseFloat(mealPlan[day]['total'].fat) + (multiplier*parseFloat(recipe.nutrition.fat)), 

                calories: parseFloat(mealPlan[day]['total'].calories) + (multiplier*parseFloat(recipe.nutrition.calories))
            }}
            }})
            
            return (
            <tr id = {recipe.id} className = 'meal'>
                <th>{recipe.title}</th>
                <th>{(recipe.nutrition.carbs).slice(0, -1)}</th>
                <th>{(recipe.nutrition.protein.slice(0, -1))}</th>
                <th>{(recipe.nutrition.fat).slice(0, -1)}</th>
                <th>{(recipe.nutrition.calories.slice(0, -4))}</th>
                <th>{formValues.servingSize}</th>
                <th><button onClick={removeMeal}>remove?</button></th>
             
            </tr>
            )
        })

        setMealPlan((mealPlan) => {
            return {...mealPlan, [day]: {...mealPlan[day], [meal]:[...mealPlan[day][meal], nutritionStats]}}
        })
       
    }

    function handleChange(e){
        const key = e.target.className
        const value = e.target.value
        setFormValues((formValues) =>{
        return {...formValues, [key]: value}
        })
        
    }

    function removeMeal(e){
        const id = e.target.parentNode.parentNode.id
        const mealTime = e.target.parentNode.parentNode.parentNode.id
        const day = e.target.parentNode.parentNode.parentNode.parentNode.id.slice(0,-5)
        const multiplier = formValues.servingSize
        const removedRecipe = recipes.filter((recipe) => {
            return recipe.id == id
        })


        setMealPlan((mealPlan) => {
            
            const jsxUpdater = mealPlan[day][mealTime].filter((meal) =>{
                return meal[0].props.id != id
            })
           
            return {...mealPlan, [day]: {...mealPlan[day], [mealTime]: jsxUpdater,
                
            ['total']: {...mealPlan[day]['total'],
                
            carbs: parseFloat(mealPlan[day]['total'].carbs) - (multiplier*parseFloat(removedRecipe[0].nutrition.carbs)),

            protein: parseFloat(mealPlan[day]['total'].protein) - (multiplier*parseFloat(removedRecipe[0].nutrition.protein)),  

            fat: parseFloat(mealPlan[day]['total'].fat) - (multiplier*parseFloat(removedRecipe[0].nutrition.fat)), 

            calories: parseFloat(mealPlan[day]['total'].calories) - (multiplier*parseFloat(removedRecipe[0].nutrition.calories))
        }}}})
       
    }
    
return (
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
        
        <div s>
        <select onChange={handleChange} className='meal' >
            <option value = "breakfast">Breakfast</option>
            <option value = "lunch">Lunch</option>
            <option value = "dinner">Dinner</option>
        </select>
        
        <select onChange={handleChange} className='recipe'>{options}</select>
        <input type = 'number' onChange={handleChange} className = 'servingSize' defaultValue={1}></input>
        {recipes.length > 0 ? <input type = 'submit' value = "Add Meal"></input> : <input disabled  type = 'submit' value = "Add Meal"></input>}
        </div>
       
    </form>
    
    <MealTable mealPlan = {mealPlan} />

</div>
)
}

export default MealPlan
