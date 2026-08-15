function add (a, b){               // file like hello.js is also called MODULE
    return a+b;
}

function sub(a, b){
    return a-b;
}

module.exports = {
//    addFn: add,
//    subFn: sub
     add,
     sub
};