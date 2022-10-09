import React , { useEffect , useState }from "react";


function MealTable({mealPlan}) {

    const days = Object.keys(mealPlan)
    const tableCSS = {
        width: '90%' , 
        border: 'double' , 
        margin: '10px' ,
        borderCollapse: 'collapse' ,
        fontFamily: 'Papyrus'
    
    }

    const mealTimeCSS = {
        border: 'double' 
    }

    const titleCSS = {fontStyle:'italic' , 
    fontWeight: 'bold' ,
    fontSize: '20px' ,
    padding: '10px'
}
    
    const table = days.map((day) => {

        return <table style = {tableCSS}key = {`${day}Table`} id = {`${day}Table`}>
            <tbody>
        <tr>
            <th style = {{fontSize: '20px'}}>{day.slice(0,1).toUpperCase() + day.slice(1)}</th>
            <th>Carbs (g)</th>
            <th>Protein (g)</th>
            <th>Fat (g)</th>
            <th>Calories (kcal)</th>
            <th>Servings</th>
        </tr>
    </tbody>

    <tbody name = 'breakfast'>
        <tr>
            <td style={titleCSS}>Breakfast</td>
        </tr>
    </tbody>

    <tbody style = {mealTimeCSS}  name = 'breakfastMeals'>
        
           {mealPlan[day]['breakfast'] ? mealPlan[day]['breakfast'] : null}

    </tbody>

    <tbody name = 'lunch'>
        <tr>
            <td style={titleCSS}>Lunch</td>
        </tr>
    </tbody>
    <tbody style = {mealTimeCSS} name = 'lunchMeals'>

        {mealPlan[day]['lunch'] ? mealPlan[day]['lunch'] : null}

    </tbody>

    <tbody name = 'dinner'>
        <tr>
            <td style={titleCSS}>Dinner</td>
        </tr>
    </tbody>
    <tbody style = {mealTimeCSS} name = 'dinnerMeals'>
      
    {mealPlan[day]['dinner'] ? mealPlan[day]['dinner'] : null}

    </tbody>

   

    <tbody>
        <tr name ='totals'>
            <th style={{fontSize: '20px' , padding: '10px'}}>Daily Total</th>
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