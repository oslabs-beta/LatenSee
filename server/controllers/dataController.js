// require needed modules
const fs = require('fs');
const parse = require('csv-parser');
const path = require('path');
const { getTotalRuns, getAllRows } = require('./csvFuncs');
const csvFuncs = require(path.resolve(__dirname, './csvFuncs.js'));

const userID = 'abc123';
const datafileName = path.resolve(__dirname, `../storage/data.csv`);
const userfileName = path.resolve(__dirname, `../storage/${userID}.csv`);

const dataController = {};

// middleware gets all the functions that the user has from the user file
dataController.getData = async (req, res, next) => {
  try {
    const results = [];
    fs.createReadStream(userfileName)
      .pipe(parse())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.locals.records = results;
        console.log('I am result from userID.csv: ', results);
        return next();
      });
  } catch (err) {
    return next({
      log: `Error in dataController within getData: ${err}`,
      status: 500,
      message: 'Error in dataController within getData ',
    });
  }
};

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
    const { records } = res.locals;
    const data = await csvFuncs.getAllRows(datafileName);
    const totalRuns = [];
    // for each function in the user file, calculate the number of runs between two specified dates
    records.forEach((row) => {
      // count tracks number of runs for each function in specified date
      let count = csvFuncs.getTotalRuns(data, row.funcID, 0, Date.now());
      // push count into the totalRuns array with additional infoprmation about the current function
      totalRuns.push({ id: row.funcID, name: row.funcName, totalRuns: count }); // for funcid= 1 [{id: 1, name: testfuncforApp1, totalRuns=count=10, numberRun:xx, numWarm }]
    });
    res.locals.runs = totalRuns;
    // console.log(res.locals.runs);
    return next();
  } catch (err) {
    return next({
      log: `Error in dataController within getRuns: ${err}`,
      status: 500,
      message: 'Error in dataController within getRuns ',
    });
  }
};

module.exports = dataController;
