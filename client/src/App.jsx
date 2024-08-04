import React,{useState,useEffect,useContext} from 'react'
import{BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'


import SignIn from './pages/SingIn'
import SignUp from './pages/SignUp'
import { UserContext } from "./context/UserContext"
import TestPage from './pages/TestPage'
import{v4 as uuidV4} from 'uuid'
import TextEditor from './TextEditor'


const App = () => {
 
 
  
 
  
  
  
  
  
  return(
  <>
  

 
<BrowserRouter>


<Routes>

<>
<Route path="/"  element={<SignIn/>}/>

<Route path="/signin"  element={<SignUp/>}/> 








<Route path="/test/:id"  element={<TextEditor/>}/>







</>
</Routes>

</BrowserRouter>








  
  
 </>

  )
}

export default App
