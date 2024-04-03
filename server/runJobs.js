// Imports
const csvFuncs = require('./controllers/csvFuncs');
const schedule = require('node-schedule');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { stringify } = require('csv-stringify/sync');
const { electron } = require('webpack');


// NEED TO MOVE THIS INTO A CONTROLLER
const userID = 'abc123';
const scheduling = {
  '10S': '*/10 * * * * *',
  '1M': '0 */1 * * * *',
  '5M': '0 */5 * * * *',
  '15M': '0 */15 * * * *',
  '30M': '0 */30 * * * *',
  '1H': '0 0 */1 * * *',
  '2H': '0 0 */2 * * *',
  '3H': '0 0 */3 * * *',
};

/**
 *
 * Given a URL, record the time of invocation, the start time, the end time of the server function.
 *
 * @param {string} endpoint : And object with { name, url }. Name is recorded as a recognizable name in the DB, while url is the function endpoint
 * @param {number} invokeTime : the time in miliseconds that this function was invoked
 */
const callAndLog = async (endpoint, invokeTime) => {
  try {
    // file where data is saved
    const fileName = path.resolve(__dirname, `./storage/data.csv`);
    // create a variable for starting time in ms, serverStart
    let serverStart = Date.now();
    // make a fetch for endpoint.url, with body identifying LatenSee as the source
    let response = await fetch(endpoint.url, {
      // GET request cannot have a body, so this is POST (generic usecase) which is creating a resource telling the lambda to be warm
      method: 'POST',
      body: 'LatenSee',
    });

    // create a variable for return time in ms, serverEnd
    let serverEnd = Date.now();
    // declare variable serverDifference = serverEnd - serverStart
    let serverDifference = serverEnd - serverStart;

    // parse the fetch results
    let result = await response.json();
    /*result = {cold: true/false} */

    const params = [
      [
        endpoint.id,
        endpoint.name,
        result.cold,
        invokeTime,
        serverStart,
        serverEnd,
        serverDifference,
      ],
    ];

    // deal with header values
    let useHeader = true;
    if (fs.existsSync(fileName)) {
      useHeader = false;
    }

    // convert data to csv
    const csvData = stringify(
      params,
      {
        header: useHeader,
        columns: [
          'funcID',
          'name',
          'cold',
          'invokeTime',
          'serverStart',
          'serverEnd',
          'serverDifference',
        ],
        cast: {
          boolean: function (value) {
            return value ? 'true' : 'false';
          },
        },
      },
      function (err, str) {
        return str;
      }
    );

    // write data to file (TO COMBINE WITH ABOVE)
    fs.appendFile(fileName, csvData, 'utf-8', (err) => {
      if (err) console.log('error writing file', err);
      else console.log('write to file completed');
    });

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

// gets an array of all the function that have the warmer turned on
const getOnFuncs = async () => {
  const srcfileName = path.resolve(__dirname, `./storage/${userID}.csv`);
  // get all functions that from user is tracking that are turned on

  // get array of all functions in the users file
  const records = await csvFuncs.getAllRows(srcfileName); //[{funcID:xx ,appName:xx ,funcName:xx ,funcFreq:xx, userID:xx ,warmerOn: Yes/No }]
  const onFuncs = [];
  records.forEach((element) => {
    if (element.warmerOn === 'Yes') {
      onFuncs.push(element);
    }
  });
  // returns an array of objects which are all the functions that have warmer turned on
  return onFuncs;
};

// create once memoization for initializeJobs
const initializeJobs = () => {
  let calledOnce = false; 
  let cache = []
  const inner = async (...args) => {
    if (!calledOnce) {
      const funcsList = await getOnFuncs()
      funcsList.forEach(element =>{
        //specify endpoint information for all the functions in the list of warmerOn functions
        let endpoint = {
          url: process.env[`${element.funcID}_URL`],
          name: element.funcName, 
          id:element.funcID, 
        }
        /* Run the jobs */
        let myJobs = schedule.scheduleJob(`${scheduling[element.funcFreq]}`, () =>
        callAndLog(endpoint, Date.now()));
        cache.push(myJobs); 
      })
      calledOnce = true; 
      console.log('passed once', "cache", cache)
    }
    else {
      console.log('ran again')
      /*cancel jobs*/
      cache.forEach ((job) => {
        job.cancel()
        console.log('cancelled')
      })
      cache = []
      console.log('showing', cache); 
      const funcsList = await getOnFuncs()
      funcsList.forEach(element =>{
        //specify endpoint information for all the functions in the list of warmerOn functions
        let endpoint = {
          url: process.env[`${element.funcID}_URL`],
          name: element.funcName, 
          id:element.funcID, 
        }
        /*Re-schedule the jobs*/
        let myJobs = schedule.scheduleJob(`${scheduling[element.funcFreq]}`, () =>
        callAndLog(endpoint, Date.now()));
        cache.push(myJobs); 
        
      })
    }
  }
  return inner; 
} 

const initializeJobsOnce = initializeJobs()




// const initializeJobs = async () => {
//   const funcsList = await getOnFuncs()
//   funcsList.forEach(element =>{
//     //specify endpoint information for all the functions in the list of warmerOn functions
//     let endpoint = {
//       url: process.env[`${element.funcID}_URL`],
//       name: element.funcName, 
//       id:element.funcID, 
//     }
//     /* Run the jobs */
//     let myJobs = schedule.scheduleJob(`${scheduling[element.funcFreq]}`, () =>
//     callAndLog(endpoint, Date.now()));
//   })
// };

module.exports = initializeJobsOnce;