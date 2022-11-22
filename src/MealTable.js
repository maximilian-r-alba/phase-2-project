import { useEffect, useState } from "react"
import styled from "styled-components"

function MealTable({mealPlan , removeFromMealPlan , day}) {

    const mealPlanKeys = Object.keys(mealPlan)
   
    const [table, setTable] = useState([])

    useEffect(() => {
        setTable(mealPlanKeys.map((key) => {

            if(key === 'total') {
                return <>
            <tbody key = {key + 'TotalsHeader'}>
                <tr name ='totals'>
                    <th>Daily Total</th>
                </tr>
            </tbody>
            
        
            <tbody key = {key + 'TotalsData'} name = 'totals'>
                <tr>
                    <th></th>
                    <th>{mealPlan['total'].carbs.toFixed(2)}</th>
                    <th>{mealPlan['total'].protein.toFixed(2)}</th>
                    <th>{mealPlan['total'].fat.toFixed(2)}</th>
                    <th>{mealPlan['total'].calories.toFixed(2)}</th>
                </tr>
        
            </tbody>
            </>
            }

            else if (mealPlan[key].length > 0){
           
            const recipes = mealPlan[key].map((meal) => {
                   
                return <tr id = {meal.id} key = {meal.id+key} className = 'meal'>
                <th>{meal.title}</th>
                <th>{(meal.nutrition.carbs).slice(0, -1)}</th>
                <th>{(meal.nutrition.protein.slice(0, -1))}</th>
                <th>{(meal.nutrition.fat).slice(0, -1)}</th>
                <th>{(meal.nutrition.calories.slice(0, -4))}</th>
                <th>{meal.servings}</th>
                <th><button onClick={removeFromMealPlan}>Remove</button></th>
            </tr>
    
                })

                return <> 
            
                <tbody key = {key}>
                    <tr>
                        <td className={key} >{key.slice(0,1).toUpperCase() + key.slice(1)}</td>
                    </tr>
                </tbody>
            
                <tbody key = {day + key + 'recipes'}  id = {day + key} className={key}>
                    
                       {mealPlan[key] ? recipes
                       : <></>}
            
                </tbody>
                </>

            }
           
        }))
    }, [mealPlan])

   
    return (
        
        <Table key = {`${day}Table`} id = {`${day}Table`}>
        <tbody>
        <tr className="header">
            <th>{day.slice(0,1).toUpperCase() + day.slice(1)}</th>
            <th>Carbs (g)</th>
            <th>Protein (g)</th>
            <th>Fat (g)</th>
            <th>Calories (kcal)</th>
            <th>Servings</th>
            <th></th>
        </tr>
        </tbody>
        {table}
        </Table>
        
    )
}

export default MealTable

const Table = styled.table`
margin-top: 40px;
border: solid #025ced;
border-collapse: collapse;
background-color: #f7f4e6;
color: #551A8B;
width: 80vw;
margin-left: auto;
margin-right: auto;
th{
    padding: 8px;
    background-color: none;
    margin: 20px;
    font-weight: normal;
    
}

td.breakfast , td.lunch , td.dinner{
    padding-top: 15px;
    font-weight: bold;
}

tbody.meal{
    border-bottom: dotted #025ced;
}

tr.header{
   border: solid #025ced;
    th{
        font-weight: bold;
    }
}

button{
  color: #551A8B;
  border: 2px solid #551A8B;
  border-radius: 15px;
  background-color: #AAC6E6;
  font-size: 10px;
}

`