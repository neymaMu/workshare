import express from 'express';
import { Server } from "socket.io";

import cors from 'cors'
import http from 'http';
import Document from './Document.js'
import path from 'path'
 
import mongoose from 'mongoose'
import AuthUser from './routes/user.js'
import cookieParser from 'cookie-parser'
import ComentUser from './routes/coment.js'
import SelecUser from './routes/select.js'



const app = express();
app.use(express.json())
app.use(cookieParser())



mongoose.connect("mongodb+srv://j4116507:0JWcQEPTfu0yxQxP@cluster0.nfqnxbb.mongodb.net/")
.then(() => console.log("DB Connected"))
.catch((error) => console.log(error))


const __dirname = path.resolve();
  
  const server = http.createServer(app);





const defaultValue = ""


const io = new Server(server, {
  cors: '*', 
});



app.use(cors({origin:"https://muhanawork.onrender.com",credentials:true}));

const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


app.use("/api/user",AuthUser)
app.use("/api/coment",ComentUser)
app.use("/api/select",SelecUser)



io.on("connection",function(socket)  {
    
  socket.on("get-document",async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document",document.data)
    socket.on("send-changes",delta => {
    socket.broadcast.to(documentId).emit("receive-changes",delta)
  })
   socket.on("save-document",async data => {
    await Document.findByIdAndUpdate(documentId,{data})
   })
})
})



async function findOrCreateDocument(id) {
    if (id == null) return
  
    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: defaultValue })
  }




  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    });
    

 

    

