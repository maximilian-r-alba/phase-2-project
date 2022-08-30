import React, { useEffect } from 'react';
import Search from './Search';

function App() {
  let img = ''
  const apiKey =  "20743aca11a74bf5b68b217a5df2ac20"
//   useEffect(() => {
//     fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=chicken salad mango?&excludeIngredients=shrimp,miso`)
//   .then((r) => r.json())
//   .then((data) => {
//     console.log(data)
//   })
// }, [])
  
// useEffect(() => {
//   fetch(`https://api.spoonacular.com/recipes/633876/nutritionWidget.json?apiKey=${apiKey}`)
// .then((r) => r.json())
// .then((data) => {
//   console.log(data)
// })
// }, [])

  return (
    <>
    <h1>Hello World</h1>
    <Search apiKey = {apiKey}></Search>
    </>
  
  );
}

export default App;
