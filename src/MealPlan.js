import React , { useEffect , useState }from "react";
import MealTable from "./MealTable";
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

    const [formValues, setFormValues] = useState({day: null,meal: 'breakfast', recipe: null , servingSize: '1'})
  


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
        if (day === null){
            return;
        }

        const meal = formValues.meal

        const updater = selectedRecipe.map((recipe) =>{
            const multiplier = parseFloat(formValues.servingSize)
            
            // setTotal((total) => {
            //     return {carbs: parseFloat(total.carbs) + (multiplier*parseFloat(recipe.nutrition.carbs)) , 
            //         protein: parseFloat(total.protein) + (multiplier*parseFloat(recipe.nutrition.protein)) , 
            //         fat: parseFloat(total.fat) + (multiplier*parseFloat(recipe.nutrition.fat)), 
            //         calories: parseFloat(total.calories) + (multiplier*parseFloat(recipe.nutrition.calories))}
            // })

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
        //  mealPlan add servingsize dicitonary key and value
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

return (
<div className = "mealplan">
    
    <form onSubmit = {addMeal}>
        <input onChange={handleChange} id = 'monday' className='day' type = 'radio' name = 'weekday' value = 'monday'></input>
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
    
    <MealTable mealPlan = {mealPlan}/>

</div>
)
}

export default MealPlan
