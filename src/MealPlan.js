import React , { useEffect , useState }from "react";
import './MealPlan.css'

function MealPlan({macros}){
    const [recipes,setRecipes] = useState()
    const [options,setOptions] = useState()

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
                    return <option key = {recipes.indexOf(recipe)} value = {recipe.title}>{recipe.title}</option>
                })
                return updater
            })
        }
        
    }, [recipes])

    function handleClick(e){
        e.preventDefault()

        console.log(e.target)
    }


const test = recipes.map((recipe) =>{
    return (
    <tr className = 'meal'>
        <th>{recipe.title}</th>
        <th>{recipe.nutrition.calories}</th>
        <th>{recipe.nutrition.calories}</th>
        <th>{recipe.nutrition.calories}</th>
        <th>{recipe.nutrition.calories}</th>
    </tr>
    )
})
console.log(recipes)
console.log(test)
    return (
<div className = "mealplan">
    
    <form onSubmit = {handleClick}>
        <input type = 'checkbox' id = 'monday' value = 'monday'></input>
        <label for = 'monday'>Monday</label><br></br>
        <input type = 'checkbox' id = 'tuesday' value = 'tuesday'></input>
        <label for = 'tuesday'>Tuesday</label>
        <select>
            <option value = "breakfast">Breakfast</option>
            <option value = "lunch">Lunch</option>
            <option value = "dinner">Dinner</option>
        </select>
        <select>{options}</select>
        <input type = 'submit' value = "Add Meal"></input>
    </form>
    
    <table id="monday">
    <tbody>
        <tr>
            <th>Monday </th>
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
        {test}
        
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
            <th>{macros.calories}</th>
            <th>456</th>
            <th>123</th>
            <th>456</th>
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