import React,{useCallback,useEffect,useState,useRef,useContext} from 'react'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import{io} from 'socket.io-client'
import{useParams} from 'react-router-dom'
import AdminProfile from './componets/AdminProfile'
import Coment from './componets/Coment'
import TextSelector from "text-selection-react";
import{ Button, Textarea} from 'flowbite-react'
import{UserContext} from './context/UserContext'


const SAVE_INTERVAL_MS = 2000

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: ["red", "blue", "yellow"] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]

// eslint-disable-next-line react/prop-types
const TextEditor = () => {
  const {id:documentId} = useParams()
  const[socket,setSocket] = useState()
  const[quill,setQuill] = useState()
  const[show,setShow] = useState([])
    const[apply,setApply] = useState(true)
    const[comment,setComment] = useState("")
   
   
  
  
  
   
    const {user}=useContext(UserContext)
  useEffect(() => {
    const s = io("http://localhost:5000",{transports: ['websocket'],})
     setSocket(s)
     
     return () => {
      s.disconnect()
    }
  },[])
  
  
  
 
  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])
 
 
 
 
 
 
 
 
 
 
 
  useEffect(() => {

   

    if(socket == null || quill == null) return 

    const handler = (delta,oldDelta,source) => {
  if(source !== 'user') return 
  socket.emit("send-changes",delta)
}
  quill.on("text-change",handler)
  
return () => {
    quill.off("text-change",handler) 
}

},[socket,quill])




useEffect(() => {

  if(socket == null || quill == null) return 
    
      const handler = (delta) => {
     quill.updateContents(delta)
  }
   socket.on("receive-changes",handler)
  return () => {
      socket.off("receive-changes",handler) 
  }
  
  },[socket,quill])





useEffect(() => {

  if(socket == null || quill == null) return 

socket.on("load-document",document => {
  quill.setContents(document)
  quill.enable()
})

  socket.emit('get-document',documentId)

},[socket,quill,documentId])







  
  
  
  
 
  
  const wrapperRef = useCallback(wrapper => {
    if(wrapper == null) return

   
wrapper.innerHTML =""
   
   
    const editor = document.createElement("div")
    wrapper.append(editor)
   const q = new Quill(editor,{theme:"snow",modules: { toolbar: TOOLBAR_OPTIONS },})
   
   

   
 
   q.disable()
  q.setText('loading...')

   setQuill(q)
  },[])


 

  
  const handleaply = () => {

  }

 
 
 

  
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const text = quill.getText();
       setShow(text);
      });
    }
  }, [quill]);
  
  const[select,setSelect] = useState([])
  
 

 

   useEffect(() => {
    document.onmouseup = () => {
  
      const me = window.getSelection(show).toString() 
      setSelect(me)
    
    
    }

    localStorage.setItem('items', JSON.stringify(select));

   },[select])



 
  
  
 
  
  return (
   
   <div className="flex justify-between">
    
    
    
    
    
    
    
   
   
   
   
    <div className="w-full ">
      
      <div onClick={handleaply}>accept</div>
      
      <AdminProfile/>
    
    
    
    </div>
  
  
  <div className="container" ref={wrapperRef}>

      </div>
  
  <div className="w-full">
 
 
  <Coment select={select} />

 
  <div  >
   
 
    
   
         
  </div>
 
 
  </div>
 

  
   
   
   
   
   
   </div>
 
 
 

 
 
  )
}

export default TextEditor
