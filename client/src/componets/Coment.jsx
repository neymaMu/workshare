import React,{useState,useContext,useEffect} from 'react'
import{ Button, Textarea} from 'flowbite-react'
import{UserContext} from '../context/UserContext'
import CommentScroll from './CommentScroll'



const Coment = () => {
 
 

 const {user}=useContext(UserContext)
 
  const[comment,setComment] = useState("")

  
  
  const handleSubmit = async(e) => {
    e.preventDefault() 

    if(comment.length >  200){
     return
    }
     
    try{
     const res = await fetch(`https://muhanawork.onrender.com/api/coment/create`,{
       credentials: "include",
     method:"POST",
    
       headers:{
         "Content-Type" : "application/json",
         'x-auth-token': "JWT_SECRET",
       },
      
       body:JSON.stringify({content:comment,userId:user._id,username:user.username,profilePicture:user.profilePicture})
      })
     
     
       const data = await res.json()
       if(res.ok){
         setComment('')
      
       }
    }
    catch(error){
     console.log(error)
    
    }
   
}
  
  
  


  
  
 















return (
   
   <div className="flex w-full mt-20 flex-col fixed ">
   
   
   
   
 
   <div className="w-[330px] ">
  

   
 <CommentScroll/>
  
  </div>
   

   
   
   
   
   
   
   <div className=" w-[330px]  ">
    
    
    
    
      <form className='border border-teal-500  rounded-md p-3' onSubmit={handleSubmit}>


      <Textarea 
    placeholder='add a Comment...'
    rows='3'
    maxLength='200'
    onChange={(e) => setComment(e.target.value)}
    value={comment}
  
  />


<div className='flex justify-between mt-5 items-center'>
        <p className='text-gray-500 text-sm'>{200 - comment.length}charector left</p>
        
        <Button outline gradientDuoTone='purpleToBlue' type="submit">
          Submit
        </Button>
      </div>


      </form>
    
    
      </div>
    
    </div>
  )
}

export default Coment
