// const http = require("http");
const express = require("express");
const port = 8000;

const app = express();

app.get('/', (req, res)=>{
    return res.send("Hello form Home Page");
})

app.get('/about', (req, res)=>{
    return res.send("Hello form about Page " + "hey " + req.query.name + " your age: " + req.query.age) ;
})

app.listen(port, ()=> console.log("Server Started"))
// const myServer = http.createServer(app)
// myServer.listen(8000, ()=> console.log("Server started"))

