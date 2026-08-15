const fs = require("fs");        // fs => file system 

// fs.writeFileSync("./test.txt", "Hey there!");    // syncrhonus

// fs.writeFile("./test.txt", "Pankaj here!", (error)=> {})  // async....

// const result = fs.readFileSync("./contact.txt","utf-8");    // always return something, like this time it returns result

// console.log(result);

// fs.readFile("./contact.txt","utf-8", (err, result) => {    // always expect function parameters, rather than returning something 
//     if(err){
//         console.log("Error", err);
//     }
//     else{
//         console.log(result)
//     }
// })

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());

fs.appendFileSync("./test.txt", `${Date.now()}Hey There \n`);

// fs.cpSync('./test.txt', './copy.txt')

// fs.unlinkSync("./copy.txt")

console.log(fs.statSync("./test.txt"));

// fs.mkdirSync('my-docs')
fs.mkdirSync('your-docs/a/b', {recursive: true})