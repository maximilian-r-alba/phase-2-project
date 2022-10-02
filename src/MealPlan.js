import React , { useEffect , useState }from "react";
import './MealPlan.css'

function MealPlan({macros}){
    const [recipes,setRecipes] = useState()
    const [options,setOptions] = useState()
    const [mealPlan, setMealPlan] = useState({
        monday:{breakfast:[] , lunch: [] , dinner: []} , 
        tuesday:{breakfast:[] , lunch: [] , dinner: []} , 
        wednesday:{breakfast:[] , lunch: [] , dinner: []} , 
        thursday:{breakfast:[] , lunch: [] , dinner: []} , 
        friday:{breakfast:[] , lunch: [] , dinner: []} , 
        saturday:{breakfast:[] , lunch: [] , dinner: []} , 
        sunday:{breakfast:[] , lunch: [] , dinner: []} 
    })

    const [mondayMeals, setMondayMeals] = useState([])
    const [formValues, setFormValues] = useState({day: 'monday',meal: 'breakfast', recipe: null , servingSize: '1'})
    const [total, setTotal] = useState({carbs:0, protein: 0 , fat: 0, calories: 0})

    useEffect(() => {
        fetch("http://localhost:3000/cookbook")
        .then((r) => r.json())
        .then((data) => {
            setRecipes(data)
        })
    }, [])

    
    useEffect(()=>{
        if(recipes != undefined){
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
        console.log(e.target)
        // console.log(recipe)
    
        const day = formValues.day
        const meal = formValues.meal

        const updater = selectedRecipe.map((recipe) =>{
            const multiplier = parseFloat(formValues.servingSize)
            
            setTotal((total) => {
                return {carbs: parseFloat(total.carbs) + (multiplier*parseFloat(recipe.nutrition.carbs)) , 
                    protein: parseFloat(total.protein) + (multiplier*parseFloat(recipe.nutrition.protein)) , 
                    fat: parseFloat(total.fat) + (multiplier*parseFloat(recipe.nutrition.fat)), 
                    calories: parseFloat(total.calories) + (multiplier*parseFloat(recipe.nutrition.calories))}
            })

            return (
            <tr className = 'meal'>
                <th>{recipe.title}</th>
                <th>{recipe.nutrition.carbs}</th>
                <th>{recipe.nutrition.protein}</th>
                <th>{recipe.nutrition.fat}</th>
                <th>{recipe.nutrition.calories}</th>
                <th>{formValues.servingSize}</th>
            </tr>
            )
        })

        setMealPlan((mealPlan) => {
            return {...mealPlan, [day]: {...mealPlan[day], [meal]:[...mealPlan[day][meal], updater]}}
        })
        

        // switch(day){
        //     case 'monday' :
        //         console.log('case monday ')
        //         setMondayMeals((mondayMeals) => {
        //             return [...mondayMeals, updater]
        //         })
        
        //     break;

        //     case 'tuesday' :
        //         console.log('its tuesday')
        //         break;

        //     default:
        //         break;
        // }
        
        
            
        e.target.reset()
    }

    function handleChange(e){
        const key = e.target.className
        const value = e.target.value
        setFormValues((formValues) =>{
        return {...formValues, [key]: value}
        })

    }



console.log(formValues)
// console.log('monday meals ' , mondayMeals)

    return (
<div className = "mealplan">
    
    <form onSubmit = {addMeal}>
        <input onChange={handleChange} id = 'monday' className='day' type = 'radio' name = 'weekday' value = 'monday' checked = {true}></input>
        <label for = 'monday'>Monday</label><br></br>
        <input onChange={handleChange} id = 'tuesday' className= 'day' type = 'radio' name = 'weekday' value = 'tuesday'></input>
        <label for = 'tuesday'>Tuesday</label>

        <select onChange={handleChange} className='meal' >
            <option value = "breakfast">Breakfast</option>
            <option value = "lunch">Lunch</option>
            <option value = "dinner">Dinner</option>
        </select>
        
        <select onChange={handleChange} className='recipe'>{options}</select>
        <input type = 'number' onChange={handleChange} className = 'servingSize' defaultValue={1}></input>
        <input type = 'submit' value = "Add Meal"></input>
    </form>
    
    <table id="mondayTable">
    <tbody>
        <tr>
            <th>Monday </th>
            <th>Carbs</th>
            <th>Protein </th>
            <th>Fat</th>
            <th>Calories</th>
            <th>Servings</th>
        </tr>
    </tbody>
       
    <tbody name = 'breakfast'>
        <tr>
            <td>Breakfast</td>
        </tr>
    </tbody>

    <tbody name = 'breakfastMeals'>
        
           {mealPlan.monday.breakfast ? mealPlan.monday.breakfast : null}

    </tbody>

    <tbody name = 'lunch'>
        <tr>
            <td>Lunch</td>
        </tr>
    </tbody>
    <tbody name = 'lunchMeals'>

        {mealPlan.monday.lunch ? mealPlan.monday.lunch : null}

    </tbody>

    <tbody name = 'dinner'>
        <tr>
            <td>Dinner</td>
        </tr>
    </tbody>
    <tbody name = 'dinnerMeals'>
      
    {mealPlan.monday.dinner ? mealPlan.monday.dinner : null}

    </tbody>

   
    <tbody>
        <tr name ='totals'>
            <th>Daily Total</th>
        </tr>
    </tbody>
    

    <tbody name = 'totals'>
        <tr>
            <th></th>
            <th>{total.carbs.toFixed(2)}</th>
            <th>{total.protein.toFixed(2)}</th>
            <th>{total.fat.toFixed(2)}</th>
            <th>{total.calories.toFixed(2)}</th>
        </tr>

    </tbody>

    </table>
    


    {/* <table id= "tuesday">
    <tbody>
        <tr>
            <th>Tuesday </th>
            <th>Carbs</th>
            <th>Protein </th>
            <th>Fat</th>
            <th>Calories</th>
        </tr>
    </tbody>
    <tbody name = 'breakfast'>
        <tr>
            <td>Breakfast</td>
        </tr>
    </tbody>
    <tbody name = 'breakfastMeals'>
        <tr className = 'meal'>
            <th>Pasta</th>
            <th>123</th>
            <th>456</th>
            <th>123</th>
            <th>456</th>
        </tr>
        <tr className = 'meal'>
            <th>Pasta</th>
            <th>123</th>
            <th>456</th>
        </tr>
    </tbody>

    <tbody name = 'lunch'>
        <tr>
            <td>Lunch</td>
        </tr>
    </tbody>
    <tbody name = 'lunchMeals'>
        <tr className = 'meal' >
            <th>Pasta</th>
            <th>123</th>
            <th>456</th>
            <th>123</th>
            <th>456</th>
        </tr>
        <tr className = 'meal'>
            <th>Pasta</th>
            <th>123</th>
            <th>456</th>
        </tr>
    </tbody>

    <tbody name = 'dinner'>
        <tr>
            <td>Dinner</td>
        </tr>
    </tbody>
    <tbody name = 'dinnerMeals'>
        <tr className = 'meal'>
            <th>Pasta</th>
            <th>123</th>
            <th>456</th>
            <th>123</th>
            <th>456</th>
        </tr>
        <tr className = 'meal'>
            <th>Pasta</th>
            <th>123</th>
            <th>456</th>
        </tr>
    </tbody>

  
    
    <tbody>
        <tr name ='totals'>
            <th>Daily Total</th>
        </tr>
    </tbody>

    <tbody name = 'totals'>
        <tr>
            <th></th>
            <th>123</th>
            <th>456</th>
            <th>123</th>
            <th>456</th>
        </tr>

    </tbody>

    </table> */}
</div>
)
}

export default MealPlan
