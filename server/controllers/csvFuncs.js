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

// takes in returns daily total number of runs for a function 
/**
 *
 * Given a function id, startdate string and enddate string, returns number of runs in that period 
 *
 * @param {number} funcID : number 
 * @param {number} startDate : the time in miliseconds that represents start of period of calculation
 * @param {number} endDate : the time in miliseconds that represents end of period of calculation
 */
csvFuncs.getTotalRuns = async(funcID, startDate, endDate) => {
    const allRoes

}


module.exports = csvFuncs;

