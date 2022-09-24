import React , { useEffect , useState }from "react";
import './MealPlan.css'

function MealPlan(){
    const [recipes,setRecipes] = useState()
    const [options,setOptions] = useState()

    useEffect(() => {
        fetch("http://localhost:3000/cookbook")
        .then((r) => r.json())
        .then((data) => {
            setRecipes(data)
        })
    },[])
console.log(recipes)
    
    useEffect(()=>{
        if(recipes != undefined){
            setOptions((options) => {
                const updater = recipes.map((recipe) => {
                    return <option value = {recipe.title}>{recipe.title}</option>
                })
                return updater
            })
        }
        
    }, [recipes])

    return (
<div className = "mealplan">
    <select>{options}</select>
    <button>Add meal</button>
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

    </table>
    


    <table id= "tuesday">
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

    </table>
</div>
)
}

export default MealPlan