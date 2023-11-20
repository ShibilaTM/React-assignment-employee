import Home from './Elements/Home';
import EmpForm from './Elements/Empform';
import { Route, Routes } from 'react-router-dom';
import Main from './ui-components/Main';
import Login from './ui-components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}></Route>
       <Route path='/home' element={<Main child={<Home/>}/>}></Route> 
       <Route path='/form'  element={<Main child={<EmpForm/>}/>}></Route>    
      </Routes>
    </div>
  );
}

export default App;
