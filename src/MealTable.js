import React , { useEffect , useState }from "react";


function MealTable({mealPlan}) {

    const days = Object.keys(mealPlan)
    const [total, setTotal] = useState({carbs:0, protein: 0 , fat: 0, calories: 0})
    console.log(total)
    
    const table = days.map((day) => {
        return <table key = {`${day}Table`} id = {`${day}Table`}>
            <tbody>
        <tr>
            <th>{day}</th>
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
        
           {mealPlan[day]['breakfast'] ? mealPlan[day]['breakfast'] : null}

    </tbody>

    <tbody name = 'lunch'>
        <tr>
            <td>Lunch</td>
        </tr>
    </tbody>
    <tbody name = 'lunchMeals'>

        {mealPlan[day]['lunch'] ? mealPlan[day]['lunch'] : null}

    </tbody>

    <tbody name = 'dinner'>
        <tr>
            <td>Dinner</td>
        </tr>
    </tbody>
    <tbody name = 'dinnerMeals'>
      
    {mealPlan[day]['dinner'] ? mealPlan[day]['dinner'] : null}

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
    })
    return (
        <>
        {table}
        <p>hi</p>
        </>
        
    )
}

export default MealTable