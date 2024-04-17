// require needed modules
// require needed modules
const fs = require('fs');
const parse = require('csv-parser');
const path = require('path');
const { getTotalRuns, getAllRows } = require('./csvFuncs');
const csvFuncs = require(path.resolve(__dirname, './csvFuncs.js'));

const userID = 'abc123';
const defaultPeriod = 7;
const datafileName = path.resolve(__dirname, `../storage/data.csv`);
const userfileName = path.resolve(__dirname, `../storage/${userID}.csv`);

// formatting numbers with comma and decimal
const numFormat = new Intl.NumberFormat('US-en')

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

/**
 *
 * middleware that gets number of runs for each function using all data available
 * This middleware controlls a lot of the core calculations being used by the front-end.
 *
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next object
 * @returns
 */
dataController.getRuns = async (req, res, next) => {
  try {
    // get array of all the functions from previous middleware
    const { records } = res.locals;

    // getting number of functions tracked and number that is on 
    res.locals.funcsTracked = records.length;
    let onCount = 0; 
    records.forEach(row => {
      if (row.warmerOn === "Yes") {
        onCount ++
      }
      return onCount; 
    })
    res.locals.funcsOn = onCount; 

    /**
     * Period determined the overall lookback, here set to default, but if something else is defined, that interger in days is used instead
     */
    const period = (!req.params.lookback) ? defaultPeriod : req.params.lookback;
    //change period to milliseconds
    const periodMS = period * 86400000;
    // calculate startDate as current date minus the period we are covering in milliseconds
    const startDate = Date.now() - new Date(periodMS);
    const endDate = Date.now();

    // Set res.locals.all to the record of all rows in the csv
    const data = await csvFuncs.getAllRows(datafileName);
    // Sending only the last 25 records (a bit more than the front end needs, just in case, but less than the whole file).
    res.locals.all = data.slice(data.length - 25);

    // declare FuncStatsCreator that accepts a funcId and funcName, we'll us this to keep track of calculated stats
    class FuncStatsCreator {
      constructor(funcID, funcName) {
        this.id = funcID;
        this.name = funcName;
        this.totalRuns = 0;
        this.coldStarts = 0;
        this.totalLatency = 0;
        this.coldTotalLatency = 0;

        // These are stats that will eventually need to be calculated
        this.percentCold = 0;
        this.aveLatency = 0;
        this.coldLatency = 0;
        this.warmLatency = 0;
        this.coldToWarm = 0;
      }

      /**
       * Helper function that will adjust properties based on if the current row is cold, and the current row's serverDifference
       */
      addRecord(cold, serverDifference) {
        // Add to the totals
        this.totalRuns++;
        this.totalLatency = this.totalLatency + serverDifference;
        // If its cold, add to the cold properties, we'll calculate warm later
        if (cold) {

          this.coldStarts++;
          this.coldTotalLatency = this.coldTotalLatency + serverDifference;
        }
      }

      /**
       * If the calculations are valid, will populate the eventual stats required
       * @returns undefined, just used to break
       */
      calculateStats() {
        // Avoid divide by zero
        if (this.totalRuns < 1) return;

        this.percentCold = this.coldStarts / this.totalRuns;
        this.aveLatency = this.totalLatency / this.totalRuns;

        // Ensure we have cold starts before calc
        if (this.coldStarts > 0) {
          this.coldLatency = this.coldTotalLatency / this.coldStarts;
        }

        // Ensure we have warm starts before calc
        if (this.totalRuns - this.coldStarts > 0) {
          this.warmLatency =
            (this.totalLatency - this.coldTotalLatency) /
            (this.totalRuns - this.coldStarts);
        }

        // Ensure we have both cold and warm latency before calc
        if (this.coldLatency > 0 && this.warmLatency > 0) {
          this.coldToWarm = this.coldLatency / this.warmLatency;
        }
      }
    }

    // Create an object that will let us aggregate stats on each function
    // key is the current funcId, value is a new FuncStatsCreator(funcId, funcName)
    const aggregator = {};
    records.forEach((record) => {
      aggregator[record.funcID] = new FuncStatsCreator(
        record.funcID,
        record.funcName
      );
    });

    // Process each row of data
    data.forEach((row) => {
      // Check that row.invokeTime is within startDate and endDate & is a function we're looking for
      if (
        row.invokeTime >= startDate &&
        row.invokeTime <= endDate &&
        Object.hasOwn(aggregator, row.funcID)
      ) {
        aggregator[row.funcID].addRecord(
          row.cold === 'true' ? true : false,
          Number(row.serverDifference)
        );
      }
    });

    // declare the resulting array which we will return
    const totalRuns = [];

    // Tell all of the aggregator objects to calculate their stats, then push a new object to the totalRuns array
    for (const funcStat in aggregator) {
      aggregator[funcStat].calculateStats();

      const funcObject = {};
      funcObject.id = aggregator[funcStat].id;
      funcObject.name = aggregator[funcStat].name;
      funcObject.totalRuns = numFormat.format(aggregator[funcStat].totalRuns); // numFormat formats number to include comma for thousands
      funcObject.coldStarts = numFormat.format(aggregator[funcStat].coldStarts);
      funcObject.percentCold = aggregator[funcStat].percentCold;
      funcObject.aveLatency = aggregator[funcStat].aveLatency;
      funcObject.coldLatency = aggregator[funcStat].coldLatency;
      funcObject.warmLatency = aggregator[funcStat].warmLatency;
      funcObject.coldToWarm = aggregator[funcStat].coldToWarm;

      totalRuns.push(funcObject);
    }

    res.locals.runs = totalRuns;

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
        let totalDayCount = 0;
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
        // used to display date in chart as US format mm/dd
        dayData['day'] = new Intl.DateTimeFormat('en-US', {day:'2-digit', month:'2-digit'}).format(week[i])
        totalDayCount = totalDayCount + count;
        dayData['dayCount'] = totalDayCount; 
      });
      
      weeklyLats.push(dayData);
    }
    res.locals.weeklyLats = weeklyLats;
    // console.log(weeklyLats);

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
