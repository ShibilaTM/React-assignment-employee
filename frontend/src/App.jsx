import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './ui-components/Main';
import Login from './ui-components/Login';
import { RequireAuth } from './elements/Auth';
import { Logout } from './elements/Logout';
import EmpForm from './elements/Empform';
import Home from './elements/Home';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/home' element={<RequireAuth><Main child={<Home/>}/></RequireAuth>}></Route>
        <Route path='/form' element={<RequireAuth><Main child={<EmpForm/>}/></RequireAuth>}></Route> 
      </Routes>
    </div>
  );
}

export default App;


