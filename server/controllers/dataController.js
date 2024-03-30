// require needed modules
const fs = require('fs'); 
const parse = require ('csv-parser');
const path = require('path');
const { getTotalRuns, getAllRows } = require('./csvFuncs');
const csvFuncs = require(path.resolve(__dirname, './csvFuncs.js'));

const userID = 'abc123'
const datafileName = path.resolve(__dirname, `../storage/data.csv`);
const userfileName = path.resolve(__dirname, `../storage/${userID}.csv`); 


const dataController = {}; 

// middleware that gets the data on our lamda function from the ENV file 
dataController.getData = async (req, res, next)=>{ 
    try { 
        const results = []; 
    fs.createReadStream(userfileName)
      .pipe(parse())
      .on('data', (data)=> results.push(data))
      .on('end', ()=>{
        res.locals.records = results; 
        return next(); 
      })
    }
    catch (err){
        return next({
            log: `Error in dataController within getData: ${err}`, 
            status: 500, 
            message: 'Error in dataController within getData '
        })

    } 
}


/* INTERNAL NOTE TO DELETE
plan is to update this to get more data:
number of runs per day and per week and overall 
number of cold starts per day and per week and overall
number of warm starts per day and per week and overall
average latency per day and per week and overall
latency for cold starts per day and per week and overall
latency for warm starts per day and per week and overall
*/
// middleware that gets number of runs for each function using all data available  
dataController.getRuns = async (req, res, next) => {
  try {
    const {records} = res.locals; 
    const data = await csvFuncs.getAllRows (datafileName)
    const totalRuns = []; 
    records.forEach(row => {
      let count = csvFuncs.getTotalRuns(data, row.funcID, 0, Date.now()); 
      totalRuns.push({id: row.funcID, name:row.funcName, totalRuns: count}); 
    })
    res.locals.runs = totalRuns
    // console.log(res.locals.runs);
    return next()
  } catch(err) {
      return next({
      log: `Error in dataController within getRuns: ${err}`, 
      status: 500, 
      message: 'Error in dataController within getRuns '
  })

  }
  


}


module.exports = dataController; 