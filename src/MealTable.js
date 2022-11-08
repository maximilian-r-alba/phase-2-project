import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
function MealTable({mealPlan , removeFromMealPlan , day}) {

    const mealPlanKeys = Object.keys(mealPlan[day])

    const [table, setTable] = useState([])

    useEffect(() => {
        setTable(mealPlanKeys.map((key) => {

            if(key === 'total') {
                return <>
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
            </>
            }

            else if (mealPlan[day][key].length > 0){
           
            const recipes = mealPlan[day][key].map((meal) => {
                   
                return <tr id = {meal.id} key = {meal.id+key} className = 'meal'>
                <th>{meal.title}</th>
                <th>{(meal.nutrition.carbs).slice(0, -1)}</th>
                <th>{(meal.nutrition.protein.slice(0, -1))}</th>
                <th>{(meal.nutrition.fat).slice(0, -1)}</th>
                <th>{(meal.nutrition.calories.slice(0, -4))}</th>
                <th>{meal.servings}</th>
                <th><button onClick={removeFromMealPlan}>remove?</button></th>
            </tr>
    
                })

                return <> 
            
                <tbody>
                    <tr>
                        <td >{key.slice(0,1).toUpperCase() + key.slice(1)}</td>
                    </tr>
                </tbody>
            
                <tbody   id = {key}>
                    
                       {mealPlan[day][key] ? recipes
                       : <></>}
            
                </tbody>
                </>

            }
           
        }))
    }, [mealPlan])

   
    return (
        
        <table key = {`${day}Table`} id = {`${day}Table`}>
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
        {table}
        </table>
        
    )
}

export default MealTable