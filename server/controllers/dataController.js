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

// middleware gets all the functions that the user has from the user file
dataController.getData = async (req, res, next)=>{ 
    try { 
        const results = []; 
    fs.createReadStream(userfileName)
      .pipe(parse())
      .on('data', (data)=> results.push(data))
      .on('end', ()=>{
        res.locals.records = results; 
        // console.log(results); 
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



// middleware that gets number of runs for each function using all data available  
dataController.getRuns = async (req, res, next) => {
  try {
    // get array of all the functions from previous middleware 
    const {records} = res.locals; 

    /* NOTE HERE ------------- get period of calculation (day, week, all data) from queryparams HARDCODED FOR NOW - TO DISCUSS WITH STEPHEN
    if one day period = 1, if one week period = 7, if all data available, period = Date.now()/86400000 --------------------*/
    const period = Date.now()/86400000
    //change period to milliseconds
    const periodMS = period * 86400000
    // calculate startDate as current date minus the period we are covering in milliseconds
    const startDate = Date.now() - new Date(periodMS)
    // console.log("start date", startDate)
    const endDate = Date.now()

    const data = await csvFuncs.getAllRows (datafileName)
    const totalRuns = []; 
    // for each function in the user file, calculate the number of runs between two specified dates (end date is alws now, and start date can be 1 day ago, 7 days ago or 0 for all data available)
    records.forEach(row => { 
      // count tracks number of runs for each function in specified date
      let count = csvFuncs.getTotalRuns(data, row.funcID, startDate, endDate); 
      // count cold tracks the number of runs for each function where 'firstRun' is true
      let countCold = csvFuncs.getCold(data, row.funcID, '1', startDate, endDate); 
      let countWarm = count - countCold

            
      // sumLat calculates the sum of the latency for each function
      let sumLat = csvFuncs.getAverage(data, row.funcID, 'serverDifference',startDate, endDate, null)
      let sumWarmLat = csvFuncs.getAverage(data, row.funcID, 'serverDifference',startDate, endDate, '')/(count-countCold)
      let sumColdLat = csvFuncs.getAverage(data, row.funcID, 'serverDifference',startDate, endDate, '1')/countCold
      
      // percCold is the average number of cold starts and avLat is the average latency
      let percCold = 0;  
      let avLat = 0
      
      if (count !== 0) {
         percCold = countCold/count
         avLat = sumLat/count
      }

      // push all calculated values into the totalRuns array with additional infoprmation about the current function
      totalRuns.push({id: row.funcID, 
        name:row.funcName, 
        totalRuns: count, 
        coldStarts: countCold, 
        percentCold: percCold, 
        aveLatency: avLat,
        coldLatency: sumColdLat ? sumColdLat : 0,
        warmLatency: sumWarmLat ? sumWarmLat : 0,
        coldToWarm: sumColdLat/sumWarmLat ? sumColdLat/sumWarmLat : 0,
  }); // for funcid= 1 [{id: 1, name: testfuncforApp1, totalRuns=count=10, numberRun:xx, numWarm }]
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