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

// middleware that gets number of runs for each function using all data available
dataController.getRuns = async (req, res, next) => {
  try {
    // get array of all the functions from previous middleware
    const { records } = res.locals;

    /* NOTE HERE ------------- get period of calculation (day, week, all data) from queryparams HARDCODED FOR NOW - TO DISCUSS WITH STEPHEN
    if one day period = 1, if one week period = 7, if all data available, period = Date.now()/86400000 --------------------*/
    const period = 7;
    //change period to milliseconds
    const periodMS = period * 86400000;
    // calculate startDate as current date minus the period we are covering in milliseconds
    const startDate = Date.now() - new Date(periodMS);
    // console.log("start date", startDate)
    const endDate = Date.now();

    console.log('Inside getRuns setting data');
    const data = await csvFuncs.getAllRows(datafileName);
    console.log('Inside getRuns set data to: ', data);
    const totalRuns = [];
    // for each function in the user file, calculate the number of runs between two specified dates (end date is alws now, and start date can be 1 day ago, 7 days ago or 0 for all data available)
    records.forEach((row) => {
      // count tracks number of runs for each function in specified date
      let count = csvFuncs.getTotalRuns(data, row.funcID, startDate, endDate);
      // count cold tracks the number of runs for each function where 'cold' is true
      let countCold = csvFuncs.getCold(
        data,
        row.funcID,
        'true',
        startDate,
        endDate
      );

      // sumLat calculates the sum of the latency for each function
      let sumLat = csvFuncs.getSum(
        data,
        row.funcID,
        'serverDifference',
        startDate,
        endDate,
        false
      );
      let avWarmLat =
        csvFuncs.getSum(
          data,
          row.funcID,
          'serverDifference',
          startDate,
          endDate,
          false
        ) /
        (count - countCold);
      let avColdLat =
        csvFuncs.getSum(
          data,
          row.funcID,
          'serverDifference',
          startDate,
          endDate,
          'true'
        ) / countCold;

      // percCold is the average number of cold starts and avLat is the average latency
      let percCold = 0;
      let avLat = 0;

      if (count !== 0) {
        percCold = countCold / count;
        avLat = sumLat / count;
      }

      // push all calculated values into the totalRuns array with additional infoprmation about the current function
      totalRuns.push({
        id: row.funcID,
        name: row.funcName,
        totalRuns: count,
        coldStarts: countCold,
        percentCold: percCold,
        aveLatency: avLat,
        coldLatency: avColdLat ? avColdLat : 0,
        warmLatency: avWarmLat ? avWarmLat : 0,
        coldToWarm: avColdLat / avWarmLat ? avColdLat / avWarmLat : 0,
      }); // for funcid= 1 [{id: 1, name: testfuncforApp1, totalRuns=count=10, numberRun:xx, numWarm }]
    });

    // calculate totals and averages for all the functions in totalRuns

    console.log('Inside dataController setting res.locals');
    console.log('Res object is: ', res);
    res.locals.runs = totalRuns;
    res.locals.all = data;
    console.log('Function sets res.locals.all at ', Date.now());
    console.log('Inside dataController set res.locals');
    console.log('Res object is: ', res);
    return next();
  } catch (err) {
    return next({
      log: `Error in dataController within getRuns: ${err}`,
      status: 500,
      message: 'Error in dataController within getRuns ',
    });
  }
};

dataController.getPeriodData = async (req, res, next) => {
  try {
    const records = res.locals.records;
    const data = await csvFuncs.getAllRows(datafileName);

    // create an array of the past 7 days where each element is an object representing the day
    //[{0:today}, {1: today -1}, {2: today -2}, {3: today -3},  etc.}]
    const today = Date.now();
    let week = [];
    for (let i = 0; i < 7; i++) {
      week.push(today - i * 86400000);
    }

    const weeklyLats = [];

    for (let i = 0; i < 7; i++) {
      let dayData = {};
      records.forEach((row) => {
        let count = csvFuncs.getTotalRuns(
          data,
          row.funcID,
          week[i + 1],
          week[i]
        );
        let avLat = csvFuncs.getSum(
          data,
          row.funcID,
          'serverDifference',
          week[i + 1],
          week[i],
          false
        );

        dayData[row.funcName] = avLat / count ? avLat / count : 0;
        dayData['day'] = new Date(week[i]).toDateString().slice(3, 11);
      });
      weeklyLats.push(dayData);
    }
    res.locals.weeklyLats = weeklyLats;
    // console.log(weeklyLats)

    return next();
  } catch (err) {
    return next({
      log: `Error in dataController within getPeriodData: ${err}`,
      status: 500,
      message: 'Error in dataController within getPeriodData ',
    });
  }
};

dataController.getComparison = async (req, res, next) => {
  try {
    // get array of all the functions from previous middleware
    const { records } = res.locals;
    const data = await csvFuncs.getAllRows(datafileName);
    const thisWeekEnd = Date.now();
    const thisWeekStart = thisWeekEnd - 7 * 86400000;

    const lastWeekStart = thisWeekStart - 7 * 86400000;

    // calculate metrics for current week
    // sum of latency for all functions, sum of all cold starts, maximum latency
    let thisWkLat = 0;
    let thisWkCold = 0;
    let max = -Infinity;
    let maxFunc;
    let maxFuncID;
    let thisWkRuns = 0;
    data.forEach((row, index) => {
      if (row.invokeTime > thisWeekStart && row.invokeTime <= thisWeekEnd) {
        thisWkRuns++;
        // calculate sum of all latency in this period
        thisWkLat = thisWkLat + Number(row.serverDifference);
        // calculate total cold starts in this period
        if (row.cold === 'true') {
          thisWkCold++;
        }

        // function with maximum latency
        if (Number(row.serverDifference) > max) {
          max = Number(row.serverDifference);
          maxFunc = row.name;
          maxFuncID = row.funcID;
        }
      }
    });
    // calculate average latency
    const thisWkAvLat = thisWkLat / thisWkRuns ? thisWkLat / thisWkRuns : 0;

    // calculate metrics for last week
    // sum of latency for all functions, sum of all cold starts, maximum latency
    let lastWkLat = 0;
    let lastWkCold = 0;
    let lastWkmax = -Infinity;
    let lastWkmaxFunc;
    let lastWkmaxFuncID;
    let lastWkRuns = 0;
    data.forEach((row, index) => {
      if ((row.invokeTime > lastWeekStart, row.invokeTime <= thisWeekStart)) {
        lastWkRuns++;
        // calculate sum of all latency in this period
        lastWkLat = lastWkLat + Number(row.serverDifference);
        // calculate total cold starts in this period
        if (row.cold === 'true') {
          lastWkCold++;
        }

        // function with maximum latency
        if (Number(row.serverDifference) > lastWkmax) {
          lastWkmax = Number(row.serverDifference);
          lastWkmaxFunc = row.name;
          lastWkmaxFuncID = row.funcID;
        }
      }
    });
    // calculate average latency
    const lastWkAvLat = lastWkLat / lastWkRuns ? lastWkLat / lastWkRuns : 0;

    // returns an array with this weeks data followed by last week's data
    res.locals.comparison = [
      {
        avLatency: thisWkAvLat,
        totalColdStarts: thisWkCold,
        maxLatency: max,
        maxLatFunc: maxFunc,
        maxLatId: maxFuncID,
      },
      {
        avLatency: lastWkAvLat,
        totalColdStarts: lastWkCold,
        maxLatency: lastWkmax,
        maxLatFunc: lastWkmaxFunc ? lastWkmaxFunc : 0,
        maxLatId: lastWkmaxFuncID ? lastWkmaxFuncID : 0,
      },
    ];

    return next();
  } catch (err) {
    return next({
      log: `Error in dataController within getComparison: ${err}`,
      status: 500,
      message: 'Error in dataController within getComparison ',
    });
  }
};

module.exports = dataController;
