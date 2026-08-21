const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require('fs');
const mongoose = require("mongoose");
const { json } = require("stream/consumers");
const { error } = require("console");
const { type } = require("os");

const app = express();
const PORT = 8000;

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>{console.log("Mongo DB Connected")})
.catch((err)=> console.log('Mongo Error', err))

// Schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    jobtitle: {
        type: String,
    },
    gender: {
        type: String,
    }
},{timestamps: true})

// Modeling schema
const User = mongoose.model('user', userSchema);

// Midleware - (pluggin)
app.use(express.urlencoded({ extended: false}))
// app.use(express.json());

app.use((req, res, next)=>{
    // console.log("Hello from middleware 1")
    // req.myUserName = "Pankaj Sah"
    // return res.json({msg: "Hello form middleware 1"});
    fs.appendFile('./log.txt',`\n${Date.now()}: ${req.method}: ${req.path}`, (err, data)=>{
        next();
    })
    // next();
})

// app.use((req, res, next)=>{
//     console.log("Hello from middleware 2", req.myUserName)
//     // return res.send("Hey!")
//     next();
// })

// Routes
app.get('/users', async(req, res) => {
    const allDbUser = await User.find({});
    const html = `
    <ul>
    ${allDbUser.map(user => `<li>${user.firstname} - ${user.email}</li>`).join("")}
    </ul>`;
    res.send(html)
})

// REST API
app.get('/api/users', async(req, res)=>{
    // console.log('i am in get route', req.myUserName);   
   res.setHeader('X-myName', 'Pankaj Sah')         // Custom Header
    // Always add X to custom headers
//    console.log(req.headers)
const allDbUser = await User.find({});
   return res.json(allDbUser)
})

app.route('/api/users/:id').get(async(req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id)
    const user = await User.findById(req.params.id);  
    if(!user) return res.status(404).json({error: "User Not Found"})
    return res.json(user)
})
.patch(async(req, res)=>{
    // TODO: Edit the user with id
    await User.findByIdAndUpdate(req.params.id, {lastname: "Changed!"})
    return res.json({status: "success"})
})
.delete(async(req, res) => {
    // TODO: delete the user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "success"})
})

app.post('/api/users', async(req, res) => {
    // TODO: Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All Fiels are required!"})
    }
    
    const result = await User.create({
        firstname: body.first_name,
        lastname: body.last_name,
        email: body.email,
        gender: body.gender,
        jobtitle: body.job_title,
    });
    
    // console.log("result", result)
    return res.status(200).json({msg: "Success"});
    // users.push({...body, id: users.length+1});
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
    //     return res.status(201).json({status: "success", id: users.length})
    // })
})


app.listen(PORT, ()=> console.log(`Server started at PORT:${PORT}`))