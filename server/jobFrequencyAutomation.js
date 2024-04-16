// imports
// node scheduler
// csv funcs
// dataController

// declare constants
// Lookback period is 24hrs
// coldPercentMax is >5%
// coldPercentMin is <0.5%
// checkfrequency is every hour
// userID = abc123


// getAutoFunctions():  function that grabs all functions that are set to be automatically managed
  // initialize array of funcs to result of csvFuncs.getAllRows on user
  // reduce to only those who have 'automatic' as true
  // return reduced version


// getAutoFuncStats(updateFuncs): for each of the functions in an array, grab their stats from the last 24hrs, if their cold % is greater than 5%, then increase their frequency
  
  // Need to spoof the middleware for express, so will create our own version of req/res/next objects to pass in

  // req: adding spoof for the time period to be shortened to configurable lookback period

  // res: 
    // res.locals.records set to updateFuncs parameter;
  //

  // next: Simple function just to have something to pass in

  // return call dataController.getRuns (spoofReq, spoofRes, spoofNext)

// updateFunctions(funcData): For every function outside of threshold, call editFunc to increase by one
  // outOfBoundsFuncs = funcData.filter cold% above cold%Target

  // for each of the outOfBounds funcs:
    // if cold% is above target
      // call to edit frequency to more frequent
    // else
      // call to edit frequency to less frequent

  

// processUpdate():
  // const updateFuncs = getAutoFunctions
  // const funcStats = getAutoFuncStats(updateFuncs);
  // call updateFunctions(funcStats);

// StartSchedule: Set up a scheduled check every hour to pull all functions, and run them through the stat update checker
  // set up node schedule to run every hour with the function:
    // interval: cronJob check frequency
    // function: processUpdate();

// export function startSchedule