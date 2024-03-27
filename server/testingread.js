// Imports
const fs = require('fs'); 
const parse = require ('csv-parser');


const results = []; 
fs.createReadStream('data.csv')
    .pipe(parse())
    .on('data', (data)=> results.push(data))
    .on('end', ()=>{
        console.log(results); 
    })


