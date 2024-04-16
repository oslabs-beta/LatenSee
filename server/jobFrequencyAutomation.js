/**
 * This file is the primary location for logic to automatically adjust frequency of pinging functions
 * It is called when the server first runs, and then executes a schedule to check and update the
 * frequency of functions within the application itself
 */

const schedule = require('node-schedule');

const csvFuncs = require('./controllers/csvFuncs');
const dataController = require('./controllers/dataController');
const configureController = require('./controllers/configController');
const runJobsModule = require('./runJobs');

const scheduling = runJobsModule.scheduling;

// declare constants
/**
 * These are constants which are used to configure elements of the jobFrequencyAutomation file.
 */
const defaultLookback = 1; // a single day, or 24hrs
const defaultColdPercentMax = 0.05; // If cold start % above this, make more frequent
const defaultColdPercentMin = 0.005; // If cold start % below this, make less frequent
const defaultCheckFrequency = '0 0 */1 * * *'; // CRON frequency string, every hour top of the hour
const defaultUserId = 'abc123'; // Placeholder while we don't yet look at userId

/**
 * Grabs all functions from the user that are managed automatically
 * @returns {row[]} An array of objects representing functions that are marked as being managed automatically
 */
const getAutoFunctions = async () => {
  const allFuncs = await csvFuncs.getAllRows(path.resolve(__dirname, `../storage/${userId}.csv`));
  // reduce to only those who have 'automatic' as true
  const autoFuncs = allFuncs.filter((currFunc) => currFunc[auto] === 'Yes');
  // return reduced version
  return autoFuncs;
};

/**
 * For each function in an array, grab their stats from the lookback period, return an array of their stats if they're out of cold % tolerance
 * @param {row[]} updateFuncs - An array of objects representing the functions we'd like to update
 * @returns {} - An array of objects representing each function's ID, their current invocation rate, and their % cold
 */
const getAutoFuncStats = async (updateFuncs) => {
  // Need to spoof the middleware for express, so will create our own version of req/res/next objects to pass in

  // Req object holds the time period we're looking for in its body
  const spoofReq = {body: {lookback: defaultLookback}};
  
  // Create a temp object with functionIds mapped to their funcFreq for fast lookup later
  const frequencyLookup = {};

  spoofReq.forEach((func) => {
    frequencyLookup[func.funcId] = func.funcFreq;
  });


  // Res object holds the set of functions we're looking for in locals.records
  const spoofRes = {locals: {records: getAutoFunctions()}};

  // next: Simple function just to have something to pass in
  const spoofNext = () => null;

  // tempStats = call dataController.getRuns (spoofReq, spoofRes, spoofNext)
  const tempStats = await dataController.getRuns(spoofReq, spoofRes, spoofNext);

  // declare result empty array
  const result = [];

  // for each of tempStats, build an object with the Id, current invocation rate and (if cold% outside tolerance), push to the result
  tempStats.forEach((func) => {
    // if cold is outside tolerance
    if(func.percentCold > defaultColdPercentMax || func.percentCold < defaultColdPercentMin) {
      // create a temp object
      const temp = {
        id: func.id,
        invocation: frequencyLookup[func.id],
        percentCold: func.percentCold,
      };

      result.push(temp);
    }
      
  })

  // return result array
  return result;
};

/**
 * Updates the invocation rate of every function passed in to increase/decrease accordingly
 * @param {funcObc[]} funcsToUpdate - Array of objects representing functions that need to be updated. Objects have an ID, invocation, and percentCold
 */
const updateFunctions = async (funcsToUpdate) => {

  // array of valid frequencies:
  const freqArray = Object.keys(scheduling);

  funcsToUpdate.forEach(async (func) => {
    
    // funcIndex = where the current func is in the freqArray
    let funcIndex = freqArray.findIndex((element) => element === func.invocation);

    // if func is cold more often than the max
    if(func.percentCold > defaultColdPercentMax) {
      if(funcIndex === 0 ) {
        console.log('Already at most frequent!');
      } else {
        initialFuncIndex--; // make it more frequent
      }
    } else {
      if (funcIndex === freqArray.length - 1) {
        console.log('Already at the least frequent!');
      } else {
        funcIndex++; // make it less frequent
      }
    }

    const newFreq = freqArray[funcIndex];

    // spoofreq: obj has a body with funcID, funcFreq
    const spoofReq = {body: {funcID: func.id, funcFreq: newFreq}};

    // spoofRes: empty object
    const spoofRes = {};

    // next: Simple function just to have something to pass in
    const spoofNext = () => null;

    // call async configController.editFunc(spoofReq, spoofRes, spoofNext);
    await configController.editFunc(spoofReq, spoofRes, spoofNext);

  });
};

/**
 * set up a scheduled check every hour that pulls all functions and runs through checking for updates
 */
const startSchedule = () => {
  const autoSchedule = schedule.scheduleJob(defaultCheckFrequency, () => {
    const updateFuncs = getAutoFunctions(autoSchedule);
    const funcStats = getAutoFuncStats(updateFuncs);
    updateFunctions(funcStats);
  })
}

module.exports = startSchedule;
