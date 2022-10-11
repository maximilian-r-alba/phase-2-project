import React , { useEffect , useState }from "react";
import MealTable from "./MealTable";

function MealPlan({macros}){
    const [recipes,setRecipes] = useState()
    const [options,setOptions] = useState()
    const [mealPlan, setMealPlan] = useState({
        monday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
        tuesday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
        wednesday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
        thursday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}} , 
        friday:{breakfast:[] , lunch: [] , dinner: [], total:{carbs: 0, protein: 0 , fat: 0, calories: 0}}
    })

    const defaultValue = {day: 'monday',meal: 'breakfast', recipe: null , servingSize: '1'}

    const [formValues, setFormValues] = useState(defaultValue)

  


    useEffect(() => {
        fetch("http://localhost:3000/cookbook")
        .then((r) => r.json())
        .then((data) => {
            setRecipes(data)
        })
    }, [])

    
    useEffect(()=>{
        if(recipes !== undefined){
            setOptions((options) => {
                const updater = recipes.map((recipe) => {
                    return <option key = {recipes.indexOf(recipe)} id = {recipe.id} value = {recipe.title}>{recipe.title}</option>
                })
                return updater
            })
          
            setFormValues({...formValues, recipe: recipes[0].title})
        }
        
    }, [recipes])

    
  

    function addMeal(e){
        e.preventDefault()
        const selectedRecipe = recipes.filter((recipe) => {
            return recipe.title === formValues.recipe
        })
    
        const day = formValues.day
        if (day === null){
            return;
        }

        const mealCSS = {
            fontFamily: 'cursive'
        }

        const meal = formValues.meal

        const updater = selectedRecipe.map((recipe) =>{
            const multiplier = parseFloat(formValues.servingSize)
            
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
                <th style = {mealCSS}>{recipe.title}</th>
                <th style = {mealCSS}>{(recipe.nutrition.carbs).slice(0, -1)}</th>
                <th style = {mealCSS}>{(recipe.nutrition.protein.slice(0, -1))}</th>
                <th style = {mealCSS}>{(recipe.nutrition.fat).slice(0, -1)}</th>
                <th style = {mealCSS}>{(recipe.nutrition.calories.slice(0, -4))}</th>
                <th style = {mealCSS}>{formValues.servingSize}</th>
                <th><button onClick={removeMeal}>remove?</button></th>
             
            </tr>
            )
        })

        setMealPlan((mealPlan) => {
            return {...mealPlan, [day]: {...mealPlan[day], [meal]:[...mealPlan[day][meal], updater]}}
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
        
        console.log(removedRecipe)

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
        <input onChange={handleChange} id = 'monday' className='day' type = 'radio' name = 'weekday' value = 'monday' defaultChecked></input>
        <label for = 'monday'>Monday</label>
        <br></br>

        <input onChange={handleChange} id = 'tuesday' className= 'day' type = 'radio' name = 'weekday' value = 'tuesday'></input>
        <label for = 'tuesday'>Tuesday</label>

        <input onChange={handleChange} id = 'wednesday' className='day' type = 'radio' name = 'weekday' value = 'wednesday'></input>
        <label for = 'wednesday'>Wednesday</label>
        <br></br>
        
        <input onChange={handleChange} id = 'thursday' className= 'day' type = 'radio' name = 'weekday' value = 'thursday'></input>
        <label for = 'thursday'>Thursday</label>

        <input onChange={handleChange} id = 'friday' className= 'day' type = 'radio' name = 'weekday' value = 'friday'></input>
        <label for = 'friday'>Friday</label>

        <select onChange={handleChange} className='meal' >
            <option value = "breakfast">Breakfast</option>
            <option value = "lunch">Lunch</option>
            <option value = "dinner">Dinner</option>
        </select>
        
        <select onChange={handleChange} className='recipe'>{options}</select>
        <input type = 'number' onChange={handleChange} className = 'servingSize' defaultValue={1}></input>
        <input type = 'submit' value = "Add Meal"></input>
    </form>
    
    <MealTable mealPlan = {mealPlan} />

</div>
)
}

export default MealPlan
