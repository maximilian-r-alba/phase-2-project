import { useEffect , useState }from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

function MealPlan({mealPlan , setMealPlan , recipes , calculator}){
    
    const [options,setOptions] = useState()
    


    const defaultValue = {day: 'monday', mealTime: 'breakfast', recipe: null , servingSize: '1'}

    const [formValues, setFormValues] = useState(defaultValue)
    
    useEffect(()=>{
        if(recipes.length !== 0){
            setOptions(() => {
                const updater = recipes.map((recipe) => {
                    return <option key = {recipes.indexOf(recipe)} id = {recipe.id} value = {recipe.id}>{recipe.title}</option>
                })
                return updater
            })
          
            setFormValues({...formValues, recipe: recipes[0].id})
        }
        else{
            setOptions(<option>No Recipes Available</option>)
            setFormValues({...formValues, recipe: 'No Recipes Available'})
        }
        
    }, [recipes])

    function addMeal(e){
        e.preventDefault()
        
        const {day, mealTime, recipe: formRecipeID, servingSize} = formValues
   
        const targetTime = JSON.parse(JSON.stringify(mealPlan[day][mealTime]))
    
        const plannedIDs = targetTime.map((meal) => {
            return meal.id
        })


        const addedRecipe = recipes.filter((recipe) => recipe.id === formRecipeID).pop()

        if(plannedIDs.includes(addedRecipe.id)){
            
            setMealPlan((mealPlan) => {
                
                const remover = [...targetTime].filter((meal) => meal.id !== addedRecipe.id)
                const updater = [...targetTime].filter((meal) => meal.id === addedRecipe.id).pop()
             
                updater.servings = updater.servings + parseInt(servingSize)
                remover.push(updater)
                return {...mealPlan, [day]: {...mealPlan[day], [mealTime]: remover}}
            })
        }
        else{
           
            addedRecipe.servings = parseInt(servingSize)
            setMealPlan((mealPlan) => {
                return {...mealPlan, [day]: {...mealPlan[day], [mealTime]: [...mealPlan[day][mealTime] , addedRecipe]}}
            })
        }
       
        const totalObj = calculator(day , addedRecipe , servingSize)
        setMealPlan((mealPlan) => {
            return {...mealPlan, [day]: {...mealPlan[day], ['total'] : totalObj}}
        })

       
    }



    function handleChange(e){
        const key = e.target.className
        const value = e.target.value
       

        if(key === 'recipe' || key === 'servingSize'){
            
            setFormValues((formValues) =>{
                return {...formValues, [key]: parseInt(value)}
                })
        }
        else{
         
            setFormValues((formValues) =>{
        return {...formValues, [key]: value}
        })}
        
    }

return (
    <>
     <DayLinks>
        <Link to ="">Weekly Overview</Link>
        <Link to ="monday">Monday</Link>
        <Link to ="tuesday">Tuesday</Link>
        <Link to ="wednesday">Wednesday</Link>
        <Link to ="thursday">Thursday</Link>
        <Link to ="friday">Friday</Link>
    </DayLinks>

<div className = "mealplan">
    
    <MealForm onSubmit = {addMeal}>
        <div className="radioDays">
        <input onChange={handleChange} id = 'monday' className='day' type = 'radio' name = 'weekday' value = 'monday' defaultChecked></input>
        <RadioLablel htmlFor = 'monday'>Monday</RadioLablel>
        <br></br>

        <input onChange={handleChange} id = 'tuesday' className= 'day' type = 'radio' name = 'weekday' value = 'tuesday'></input>
        <RadioLablel htmlFor = 'tuesday'>Tuesday</RadioLablel>

        <input onChange={handleChange} id = 'wednesday' className='day' type = 'radio' name = 'weekday' value = 'wednesday'></input>
        <RadioLablel htmlFor = 'wednesday'>Wednesday</RadioLablel>
        <br></br>
        
        <input onChange={handleChange} id = 'thursday' className= 'day' type = 'radio' name = 'weekday' value = 'thursday'></input>
        <RadioLablel htmlFor = 'thursday'>Thursday</RadioLablel>

        <input onChange={handleChange} id = 'friday' className= 'day' type = 'radio' name = 'weekday' value = 'friday'></input>
        <RadioLablel htmlFor = 'friday'>Friday</RadioLablel>
        </div>
        
        <div className="formOptions">
        <select onChange={handleChange} className='mealTime' >
            <optgroup>
                <option value = "breakfast">Breakfast</option>
                <option value = "lunch">Lunch</option>
                <option value = "dinner">Dinner</option>
            </optgroup>
        </select>
        
        <select onChange={handleChange} className='recipe'>{options}</select>
        <input type = 'number' onChange={handleChange} className = 'servingSize' defaultValue={1}></input>
      
        </div>
        {recipes.length > 0 ? <input type = 'submit' className = 'addMeal' value = "Add to Meal Plan"></input> : <input disabled  type = 'submit' value = "Add to Meal Plan"></input>}
    </MealForm>
  
</div>

   

<Outlet/>
</>
)}

export default MealPlan

const RadioLablel = styled.label`
color: #551A8B;
font-family: 'Kalam', cursive;
font-weight: bold;
`

const DayLinks = styled.div`
font-family: 'Kalam', cursive;
font-weight: bold;
margin: 50px auto auto auto;
text-align: center;

a{
    text-align: center;
    margin-left: 20px;
    padding: 10px;
    border: solid #025ced;
    border-radius: 10px;
    background-color: #f7f4e6;
    font-size: 15px;
}
`

const MealForm = styled.form`
margin-top: 50px;
padding-bottom: 20px;
display: flex;
justify-content: center;

.formOptions{
 
    align-self: center;
}
.recipe , .mealTime , .servingSize{
    margin-left: 20px;
    background-color: #f7f4e6;
    border: solid #025ced;
    font-family: 'Kalam', cursive;
    color: #551A8B;
    font-size: 15px;
    font-weight: bold;
}
.servingSize{
    width: 40px;
}
.addMeal{
    font-size: 15px;
    margin-left: 20px;
    color:#551A8B;
    background-color: #f7f4e6;
    border: solid #025ced;
    height: 30px;
    align-self: center;
    font-family: 'Kalam', cursive;
    font-weight: bold;
}
.radioDays{
    border: solid;
    background-color: #f7f4e6;
    border: solid #025ced;
}
`