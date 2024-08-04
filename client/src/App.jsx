import React from 'react'


import TextEditor from './TextEditor'

import{BrowserRouter,Routes,Route} from 'react-router-dom'





import SignIn from './pages/SingIn'
import SignUp from './pages/SignUp'




const App = () => {
 
 
 
  return(
  
    <BrowserRouter>

      <Routes>

     <Route path="/" element={<SignIn/>}/>

     <Route path="/signup" element={<SignUp/>}/>
    
     <Route path="/test/:id" element={<TextEditor/>}/>
      
      
      
      </Routes>


 
 

  
  
    </BrowserRouter>

  )
}

export default App

