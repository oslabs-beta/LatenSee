const fs = require ('fs');
const parse = require ('csv-parser');

const csvFuncs = {}; 
// returns array of objects, each object is a row with key = column name and value = value in cell 
csvFuncs.getAllRows = async (fileName) => {
    return new Promise ((resolve, reject)=> {
        const results = []; 
        fs.createReadStream(fileName)
        .pipe(parse())
        .on('data', (data)=> results.push(data))
        .on('end', ()=>{
            resolve(results); 
        })

    })
    
}

module.exports = csvFuncs;

