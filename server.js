const express = require ('express');
const server = express();

server.use(express.static('public'));

server.get("/",(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

server.get("/ideas",(req,res)=>{
    res.sendFile(__dirname + '/ideas.html');
})

server.listen(3000);
