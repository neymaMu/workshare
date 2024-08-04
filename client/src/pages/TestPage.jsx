import React,{useState,useEffect} from 'react'
import TextEditor from '../TextEditor'
const TestPage = () => {
 
 
    const[users,setUsers] = useState([])
  
    const fetchuser =async () => {
      try{
      const res = await fetch('http://localhost:5000/api/user/getuser',{
        credentials: "include",
      })
      
      const data = await res.json()
     
      
     if(res.ok){
     setUsers(data)
     }
    } 
      
      catch(error){
      console.log(error)
      }
        }
      
       
       useEffect(() => {
      fetchuser()
       },[])
    
    console.log(users)
 
 
 
    return (
   
   
   
   
   
   <div>
   
         <TextEditor />
 
    
   
    </div>
  )
}

export default TestPage
