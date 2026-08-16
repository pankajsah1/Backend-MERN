const http = require('http');
const fs = require('fs')


const myServer = http.createServer((req, res) => {
    // console.log(req);
    const log = `${Date.now()}: ${req.url} New Request Recieved.\n`
    fs.appendFile('log.txt', log, (err, data) => {
        switch(req.url){
            case '/': res.end("WelCome to Home Page");
            break;
            case '/about': res.end("This is about page");
            break;
            default: res.end("404 Not found");
        }
    })
})

myServer.listen(8000, () => console.log("Server Started!"));