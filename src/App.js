import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router ,Routes } from 'react-router-dom';
import "./index.css";
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Contact from './components/Contact';
import { Route } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Logout from './components/Logout';
const App = () => {
  return (
    <>
    
      <Router>
      <Navbar/>
       <Routes>
 <Route path="/" exact element={<Home/>}/>
 <Route path="/about" exact element={<About/>}/>
 <Route path="/signup" exact element={<Signup/>}/>
 <Route path="/login" exact element={<Login/>}/>
 <Route path="/contact" exact element={<Contact/>}/>
 <Route path="/logout" exact element={<Logout/>}/>
 
 <Route path="*" exact element={<ErrorPage/>}/>
</Routes>

      </Router>
    </>
  )
}

export default App