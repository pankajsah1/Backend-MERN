const { log } = require('console');
const fs = require('fs');

// // Synchronus -> Blocking request (Operation)
// fs.writeFileSync("./test.text", "Hello this is node.js Architecture")

// // Asynchronus -> Non-Blocking request (Operation)
// fs.writeFile("./test.text", " This is non blocking operation", (err)=>{});


// console.log("1");

// // // Blocking request
// // const result = fs.readFileSync("./contact.txt","utf-8");
// // console.log(result);

// //Non Blocking request
// fs.readFile("./contact.txt","utf-8", (err, result) => {
//     console.log(result)
// });


// console.log("2");

// Default Thread Pool Size = 4
// Max? -8core cpu - 8

const os = require('os');

console.log(os.cpus().length)