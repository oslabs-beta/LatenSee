// Imports
const fs = require('fs')
const {stringify} = require('csv-stringify/sync'); 

const myArray = [
    {a: 1, b: 2, c:false},
    {a: 4, b: 5, c:true},
    {a: 7, b: 8, c:false},
]; 


let useHeader = true; 
if (fs.existsSync('data.csv')){
  useHeader = false
}

const result = stringify(myArray, {header: useHeader, columns: [{key: 'a'}, {key: 'b'}, {key: 'c'}] }, function (err, str) {
    return str;

  }); 

console.log(result); 

fs.appendFile('data.csv', result, 'utf-8', (err)=>{
    if (err) console.log(err); 
    else console.log('data saved'); 
}); 

