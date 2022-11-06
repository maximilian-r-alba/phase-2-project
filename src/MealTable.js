import { useEffect, useState } from "react"
function MealTable({mealPlan , day}) {

    const days = Object.keys(mealPlan)    
    const [dayObj, setDayObj] = useState(mealPlan[day])
    const mealPlanKeys = Object.keys(dayObj)

    const [table, setTable] = useState([])

    useEffect(() =>{
        setDayObj(mealPlan[day])
        
    }, [mealPlan])

    useEffect(() => {
        setTable(mealPlanKeys.map((key) => {

            if (key !== 'total'){
                return <> 
            
                <tbody>
                    <tr>
                        <td >{key.slice(0,1).toUpperCase() + key.slice(1)}</td>
                    </tr>
                </tbody>
            
                <tbody   id = {key}>
                    
                       {dayObj['breakfast'] ? dayObj[key] : <></>}
            
                </tbody>
                </>
            }
            else {
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
           
        }))
    }, [dayObj])
    
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