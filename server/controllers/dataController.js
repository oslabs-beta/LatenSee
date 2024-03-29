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
    // INTERNAL NOTES - TO DELETE 
    // In the future will implement way to get data for each individual function by ID. currently only have one function. 
    try { 
        const results = []; 
    fs.createReadStream(userfileName)
      .pipe(parse())
      .on('data', (data)=> results.push(data))
      .on('end', ()=>{
        res.locals.records = results; 
        // console.log("from controller", res.locals.funcData);  
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

dataController.getRuns = async (req, res, next) => {

  try {
    const {records} = res.locals; 
    const data = await csvFuncs.getAllRows (datafileName)
    const totalRuns = []; 
    records.forEach(row => {
      let count = csvFuncs.getTotalRuns(data, row.funcID, 0, Date.now()); 
      totalRuns.push({id: row.funcID, totalRuns: count}); 
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