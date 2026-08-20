const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const { json } = require("stream/consumers");

const app = express();
const PORT = 8000;

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
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html)
})

// REST API
app.get('/api/users', (req, res)=>{
    // console.log('i am in get route', req.myUserName);
    
   return res.json(users)
})

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return res.json(user)
})
.patch((req, res)=>{
    // TODO: Edit the user with id
    return res.json({status: "pending"})
})
.delete((req, res) => {
    // TODO: delete the user with id
    return res.json({status: "pending"})
})

app.post('/api/users', (req, res) => {
    // TODO: Create new user
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
        return res.json({status: "success", id: users.length})
    })
})


app.listen(PORT, ()=> console.log(`Server start rendering`))