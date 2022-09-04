import React, { useEffect, useState } from 'react';
import {Routes , Route} from "react-router-dom"
import Search from './Search';
import NavBar from './NavBar';
import CookBook from './Cookbook';

function App() {
  
  const apiKey =  "c7d05118b4bd43739598790d73ed2abb"
  

  const [page, setPage] = useState("/")

  return (
    <>
    <NavBar onChangePage={setPage} />
    <Routes>
      <Route path="/search" 
      element = {<Search apiKey = {apiKey}/>}/>
      <Route path="/cookBook" 
      element = {<CookBook apiKey = {apiKey}/>}/>
      {/* <Route path="/mealplan" 
      element = {<Search apiKey = {apiKey}/>}/> */}
        
    </Routes>
    
    </>
  
  );
}

export default App;
