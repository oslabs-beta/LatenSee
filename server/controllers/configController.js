const fs = require('fs');
const path = require('path');
const csvFuncs = require(path.resolve(__dirname, './csvFuncs.js'));
const parse = require('csv-parser');
const { stringify } = require('csv-stringify/sync');
const initializeJobsOnce = require('../runJobs');

const configController = {};
let funcID;
// keeping userID hardcoded for now until we work out authentication
const userID = 'abc123';
// setting up headers for the user file that lists all the functions for a single user
const heading = [
  { key: 'funcID' },
  { key: 'appName' },
  { key: 'funcName' },
  { key: 'funcFreq' },
  { key: 'userID' },
  { key: 'warmerOn' },
  { key: 'funcUrl' },
];

// middleware that takes information from the configure page POST request body and saves information where is is required.
configController.addNew = async (req, res, next) => {
  try {
    // deconstructing information from body
    // TEMPORARILY ADDING DEFAULT TO 'Yes' for waremerOn
    const { appName, funcName, funcUrl, funcFreq, warmerOn = 'Yes' } = req.body;

    // if user file does not exist create file and set up file headers

    // check if file already exists
    const fileName = path.resolve(__dirname, `../storage/${userID}.csv`);

    if (!fs.existsSync(fileName)) {
      funcID = 1;
      fs.appendFileSync(
        fileName,
        stringify(
          [{ funcID, appName, funcName, funcFreq, userID, warmerOn, funcUrl }],
          {
            header: true,
            columns: heading,
          }
        ),
        'utf-8',
        (err) => {
          if (err) console.log(err);
          else {
            console.log('function data saved');
          }
        }
      );
    } else {
      // if user file exists,
      // first check last id and create id for func
      const records = await csvFuncs.getAllRows(fileName);
      //records = [{funcid:1, funName:xxx, funcFreq:10 etc..}]
      // If records has no rows, set funcID to 1, otherwise set it equal to one more than the ID of the last function in records.
      funcID =
        records.length === 0
          ? 1
          : parseInt(records[records.length - 1].funcID) + 1;
      // then append funcID, userID, appName, funcName and funcFreq to user's file)
      fs.appendFileSync(
        fileName,
        stringify(
          [{ funcID, appName, funcName, funcFreq, userID, warmerOn, funcUrl }],
          { header: false },
          function (err, str) {
            if (err) {
              console.log(err);
            } else {
              console.log('added new record');
            }
          }
        )
      );
    }

    // restart invocations to take into account the new function
    initializeJobsOnce(); 

    return next();
  } catch (err) {
    return next({
      log: `Error in configController.addNew middleware ${err}`,
      status: 500,
      message: `Error in configController.addNew middleware`,
    });
  }
};

// If the user wants to edit the frequency the function is pinged,
configController.editFunc = async (req, res, next) => {
  try {
    const { funcID, funcUrl, funcFreq, warmerOn } = req.body;

    const userfileName = path.resolve(__dirname, `../storage/${userID}.csv`);

    // get array of all functions in the users file
    const records = await csvFuncs.getAllRows(userfileName);

    // iterate through records to get object with funcID
    let selectedIndex;
    records.forEach((element, index) => {
      if (element.funcID === funcID.toString()) {
        selectedIndex = index;
        return selectedIndex;
      }
    });

    // if new frequency is specified, update the frequency of the function and re-write file
    if (funcFreq) {
      records[selectedIndex].funcFreq = funcFreq;
      fs.writeFileSync(
        userfileName,
        stringify(
          records,
          { header: true, columns: heading },
          function (err, str) {
            if (err) {
              console.log(err);
            } else {
              console.log('updated record');
            }
          }
        )
      );
    }

    if (warmerOn) {
      records[selectedIndex].warmerOn = warmerOn;
      fs.writeFileSync(
        userfileName,
        stringify(
          records,
          { header: true, columns: heading },
          function (err, str) {
            if (err) {
              console.log(err);
            } else {
              console.log('updated record');
            }
          }
        )
      );
    }
    // restart invocations to take into account the edited item
    initializeJobsOnce();
    return next();
  } catch (err) {
    return next({
      log: `Error in configController editFunc middleware ${err}`,
      status: 500,
      message: `Error in configController editFunc middleware`,
    });
  }
};

configController.deleteFunc = async (req, res, next) => {
  try {
    // TO CONFIRM IF QUERY OR PARAM WITH FRONT END
    const funcID = req.query.id;
    // get correct file, which is user file that contains all the functions user is tracking
    const userfileName = path.resolve(__dirname, `../storage/${userID}.csv`);

    // get array of all functions in the users file
    let records = await csvFuncs.getAllRows(userfileName);
    records.forEach((row, index) => {
      if (row.funcID === funcID) {
        records = records.slice(0, index).concat(records.slice(index + 1));
      }
    });

    fs.writeFileSync(
      userfileName,
      stringify(
        records,
        { header: true, columns: heading },
        function (err, str) {
          if (err) {
            console.log(err);
          } else {
            console.log('function deleted');
          }
        }
      )
    );
    initializeJobsOnce();
    return next();
  } catch (err) {
    return next({
      log: `Error in configController deleteFunc middleware ${err}`,
      status: 500,
      message: `Error in configController deleteFunc middleware`,
    });
  }
};

module.exports = configController;
