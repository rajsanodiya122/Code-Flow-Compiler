import React from 'react'
import Signup from './Signup'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element= {<Login />}></Route>
      <Route path='/dashboard' element= {<Dashboard />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
