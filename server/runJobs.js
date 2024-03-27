// Imports
const schedule = require('node-schedule');
require('dotenv').config();
const fs = require('fs')
const {stringify} = require('csv-stringify/sync'); 

/**
 *
 * Given a URL, record the time of invocation, the start time, the end time of the server function.
 *
 * @param {string} endpoint : And object with { name, url }. Name is recorded as a recognizable name in the DB, while url is the function endpoint
 * @param {number} invokeTime : the time in miliseconds that this function was invoked
 */
const callAndLog = async (endpoint, invokeTime) => {
  try {
    // create a variable for starting time in ms, serverStart
    let serverStart = Date.now();
    // make a fetch for endpoint.url
    let response = await fetch(endpoint.url); 

    // create a variable for return time in ms, serverEnd
    let serverEnd = Date.now();
    // declare variable serverDifference = serverEnd - serverStart
    let serverDifference = serverEnd - serverStart;

    // parse the fetch results
    let result = await response.json();

    // make an async request to write these results to the DB:

    // const SQL = `
    //   INSERT INTO logs ("name", "url", "invokeTime", "formattedResponse", "functionInitialLoad", "functionInnertime", "msSinceFunctionLoad", "firstRun", "serverStart", "serverEnd", "serverDifference")
    //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    //   RETURNING *
    // `;

    const params = [
    [endpoint.name,
      invokeTime,
      result.formattedResponse,
      result.functionIntialLoad,
      result.functionInnertime,
      result.msSinceFunctionLoad,
      result.firstRun,
      serverStart,
      serverEnd,
      serverDifference]
    ];

    // console.log(params); 

    // deal with header values 
    let useHeader = true; 
    if (fs.existsSync('data.csv')){
      useHeader = false
    }

    // convert data to csv 
    const csvData = stringify(params, {header: useHeader, 
    columns: [
      'name',
      'invokeTime', 
      'formattedResponse',
      'functionIntialLoad',
      'functionInnertime',
      'msSinceFunctionLoad',
      'firstRun',
      'serverStart',
      'serverEnd',
      'serverDifference' 
    ]
  }, function (err, str){
    return str; 
  })

  // write data to file (TO COMBINE WITH ABOVE)
  fs.appendFile('data.csv', csvData, 'utf-8', (err)=>{
    if(err) console.log('error writing file', err); 
    else console.log('write to file completed'); 
  })

    //console log result.formattedResponse & inserted row
    console.log(
      `Called ${endpoint.name} at an invoke time of ${new Date(
        invokeTime
      ).toString()}`
    );
  } catch (err) {
    console.log('Hit an error: ', err);
  }
};

/**
 * Set up schedules for lambdas that run...
 *
 * Every...10s, 1m, 5m, 15m, 30m, 1hr, 2hr, 3hr, 4hr, 5hr
 */

const endpointTest = {
  url: process.env.URL_TEST,
  name: 'Test-ping',
};



const initializeJobs = () => {
  /* Run the jobs */
  const job10S = schedule.scheduleJob('*/10 * * * * *', () =>
    callAndLog(endpointTest, Date.now())
  );
};

module.exports = initializeJobs;