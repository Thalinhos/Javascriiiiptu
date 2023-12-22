const fs = require('fs');
const cp = require('child_process');

const folderPath = "../ConsoleApp2";

fs.readdir(folderPath, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
})

let myarr = [];

cp.execFile('python', ['index.py', 'hello', 'world'], (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    myarr.push(data);
    myarr.push(myarr[0].split('\n').join('').split('\r').join(''));
    const myData = myarr[1].charAt(0).toUpperCase() + myarr[1].slice(1);


    console.log(myData, 'Agora eu estou no nodejs :D');
  
})


