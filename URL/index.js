const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    // console.log("response created")
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url}: ${req.method} new request recieved \n `;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.text",log, (err, data) => {
        switch(myUrl.pathname){
            case '/':
                if(req.method === 'GET')  res.end("WelCome to Home Page");
            break;
            case '/about': 
              const username = myUrl.query.myname;
              res.end(`Hi, ${username}`);
            break;
            case '/search':
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
                case '/signup':
                    if(req.method === 'GET') res.end("This is signup form")
                    else if(req.method === 'POST'){
                    // DB Query
                    res.end("Success");
                }
            default: res.end("404 Not found");
        }
    })
})

myServer.listen(8000, ()=>console.log("Server Started"))