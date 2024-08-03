const express = require("express")
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const mongoose = require("mongoose")
const Document = require("./Document")
const path = require("path")

app.use(cors({origin:"http://localhost:3000"}));

mongoose.connect("mongodb+srv://j4116507:0JWcQEPTfu0yxQxP@cluster0.nfqnxbb.mongodb.net/")
.then(() => console.log("DB Connected"))
.catch((error) => console.log(error))

const _dirname = path.resolve();


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});







const defaultValue = ""


const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});




const PORT = 5000;



io.on("connection",socket => {
    
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








server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));