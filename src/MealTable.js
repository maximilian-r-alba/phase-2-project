function MealTable({mealPlan}) {
    
    const days = Object.keys(mealPlan)
 
    
    const table = days.map((day) => {

        return <table key = {`${day}Table`} id = {`${day}Table`}>
            <tbody>
        <tr>
            <th >{day.slice(0,1).toUpperCase() + day.slice(1)}</th>
            <th>Carbs (g)</th>
            <th>Protein (g)</th>
            <th>Fat (g)</th>
            <th>Calories (kcal)</th>
            <th>Servings</th>
        </tr>
    </tbody>

    <tbody>
        <tr>
            <td >Breakfast</td>
        </tr>
    </tbody>

    <tbody   id = 'breakfast'>
        
           {mealPlan[day]['breakfast'] ? mealPlan[day]['breakfast'] : <></>}

    </tbody>

    <tbody>
        <tr>
            <td >Lunch</td>
        </tr>
    </tbody>
    <tbody  id = 'lunch'>

        {mealPlan[day]['lunch'] ? mealPlan[day]['lunch'] : <></> }

    </tbody>

    <tbody>
        <tr>
            <td >Dinner</td>
        </tr>
    </tbody>
    <tbody  id = 'dinner'>
      
    {mealPlan[day]['dinner'] ? mealPlan[day]['dinner'] : <></>}

    </tbody>

   

    <tbody>
        <tr name ='totals'>
            <th>Daily Total</th>
        </tr>
    </tbody>
    

    <tbody name = 'totals'>
        <tr>
            <th></th>
            <th>{mealPlan[day]['total'].carbs.toFixed(2)}</th>
            <th>{mealPlan[day]['total'].protein.toFixed(2)}</th>
            <th>{mealPlan[day]['total'].fat.toFixed(2)}</th>
            <th>{mealPlan[day]['total'].calories.toFixed(2)}</th>
        </tr>

    </tbody>
        </table>
    })
    return (
        <>
        {table}
        </>
        
    )
}

export default MealTable