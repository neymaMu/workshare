import React, { useState,useContext,useEffect } from 'react'

import { Link,useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'

import { UserContext } from "../context/UserContext"
import{v4 as uuidV4} from 'uuid'



export default function SignIn() {
 
    const {setUser,user}=useContext(UserContext)
     const[formData,setFormData] = useState({})
    
     const[errorMessage,setErrorMessage] = useState(false)
     
     const[loading,setLoading] = useState(false)
      
     const navigate = useNavigate()
     


    

     
      

    
















    
     
     const handleChane = (e) =>{
     setFormData({...formData,[e.target.id] : e.target.value.trim()})
   
    }
 

     const handleSubmit = async(e) => {
    
      e.preventDefault()
   
     
     if( !formData.email || !formData.password){
      return setErrorMessage("please fill all the field")
     }
     
      try{
       
        setLoading(true)
        setErrorMessage(false)
      const res = await fetch("https://muhanawork.onrender.com/api/user/signIn",{
        credentials: "include",
    
      method:"POST",
   
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
  
      });
  
          const data = await res.json()
          if(data.success === false){
            return setErrorMessage(data.message)
           }
          
          
            setLoading(false)
            setErrorMessage(true)
   
         
           
        if(res.ok){
          setUser(data)
        
            navigate(`/test/${uuidV4}`)
          }
  
           
   
   
          }catch(error){
 
    setLoading(false)
    setErrorMessage(false)
   
   }
  }
    


  
   
 
   
 


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  return (
  
  
 
    <div className='min-h-screen mt-20 '>
 
   
    <div className='flex md:gap-20 gap-5 p-5 max-w-2xl mx-auto flex-col md:flex-row md:items-center '>
 
  
   
 
   
   
   
   
   <div className='flex-1'>
  
   <form className='flex flex-col gap-3' onSubmit={handleSubmit}>

   
   {
    errorMessage ? <Alert className='flex items-center justify-center ' color="failure">{errorMessage}</Alert>:null
  }
  
   
   
   
  

   <div>
 <Label value="your  email" />

 <TextInput  type="email" placeholder='Email' id="email" onChange={handleChane}/>
 
   </div>
  

   <div>
 <Label value="your Password" />

 <TextInput  type="password" placeholder='Password' id="password" onChange={handleChane}/>
 
   </div>
  
  
  
  <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
   {loading ? <> <Spinner /> <span className='pl-3'>Loading</span></> : 'SignIn' }
   
   
   
 
  
  </Button>
  
   
  
   
   
   </form>
  
  
  <div className='mt-5 flex gap-3 text-sm'>
   <span> Dont Have an Account?</span>
   <Link to="/signin" className='text-blue-700 font-bold'>
   Sign up
   </Link>
  
  
  </div>
  
  
  
 
   </div>
   
   
   
</div>
    
    
    </div>
  )
}