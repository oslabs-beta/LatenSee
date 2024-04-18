// Reference dataController.test.js: https://github.com/oslabs-beta/LatenSee/blob/evan/refactorGetRuns/__tests__/dataController.test.js

const fs = require('fs');
const path = require('path');
const app = require('../server/server.js');

const configController = require('../server/controllers/configController');
const csvFuncs = require('../server/controllers/csvFuncs');

describe('configController.addNew', () => {
  // create a variable for the path where we expect the abc123.csv to live
  const expectedPath = path.resolve(__dirname, '../server/storage/test123.csv');

  beforeAll(() => {
    // Ensure the file is deleted at the start of the test suite
    if (fs.existsSync(expectedPath)) {
      fs.unlinkSync(expectedPath);
      console.log('File deleted successfully before starting the tests.');
    }
  });

  afterAll(() => {
    // Clean up by deleting the file after all tests have run
    if (fs.existsSync(expectedPath)) {
      fs.unlinkSync(expectedPath);
      console.log('File deleted successfully after all tests.');
    }
  });

  it('The first time a new users adds a function, it creates a users csv file and saves the function to it', async () => {
    //addNew method requires req, res, and next
    const req = {};
    const res = {};
    const next = jest.fn();

    // form a fake request body, with the parameters:
    req.body = {
      appName: 'TestApp1',
      funcName: 'TestFunc1',
      funcUrl: 'http://testfunc1.com',
      funcFreq: '10S',
      warmerOn: 'Yes',
      userID: 'Test123',
    };

    console.log('req is now: ', req);
    // we should run the addNew method, with a reqBody for a new user's function
    await configController.addNew(req, res, next);

    // expect there to exist a file at the abc123.csv path
    expect(fs.existsSync(expectedPath)).toBe(true);

    // get the latest rows of data in the expectedPath
    const expectedRows = await csvFuncs.getAllRows(expectedPath); // Array of objects that represent each row in the file at expectedPath
    console.log('Contents of the file at expectedPath is: ', expectedRows);

    // expect: it has a single function in it, matching the func details we passed in
    // look at the last line in the file, and see that it matches data from our fake request body
    expect(expectedRows.length).toBe(1);
    expect(expectedRows[0].appName).toEqual(req.body.appName);
    expect(expectedRows[0].funcName).toEqual(req.body.funcName);
    expect(expectedRows[0].funcUrl).toEqual(req.body.funcUrl);
    expect(expectedRows[0].funcFreq).toEqual(req.body.funcFreq);
    expect(expectedRows[0].warmerOn).toEqual(req.body.warmerOn);

    //Or:
    // for (const property in req.body) {
    //   expect(expectedRows[0][property]).toEqual(req.body[property]);
    // }

    // expect: the new function's ID is 1
    // look at the last line in the file and see that funcId === 1
    expect(expectedRows[0].funcID).toEqual('1');
  });

  it('Adds a new function to the existing CSV file', async () => {
    //addNew method requires req, res, and next
    const req = {};
    const res = {};
    const next = jest.fn();

    // form a fake request body, with the parameters:
    req.body = {
      appName: 'TestApp2',
      funcName: 'TestFunc2',
      funcUrl: 'http://testfunc2.com',
      funcFreq: '1M',
      warmerOn: 'Yes',
      userID: 'Test123',
    };

    await configController.addNew(req, res, next);

    const expectedRows = await csvFuncs.getAllRows(expectedPath); //get all rows in file at the test123.csv path
    expect(expectedRows.length).toBe(2);
    for (const property in req.body) {
      expect(expectedRows[1][property]).toEqual(req.body[property]);
    }
    expect(expectedRows[1].funcID).toEqual('2');
  });

  it('The newest function has an ID which is one higher than the previous function', async () => {
    //addNew method requires req, res, and next
    const req = {};
    const res = {};
    const next = jest.fn();

    // form a fake request body, with the parameters:
    req.body = {
      appName: 'TestApp3',
      funcName: 'TestFunc3',
      funcUrl: 'http://testfunc3.com',
      funcFreq: '10S',
      warmerOn: 'No',
      userID: 'Test123',
    };

    await configController.addNew(req, res, next);

    const expectedRows = await csvFuncs.getAllRows(expectedPath);

    // Parse IDs as integers since they are stored as strings
    const previousFuncID = Number(expectedRows[1].funcID);
    const newFuncID = Number(expectedRows[2].funcID);
    console.log(previousFuncID); // 2
    console.log(newFuncID); // 3

    // Check if the new function's ID is one higher than the previous function's ID
    expect(newFuncID).toEqual(previousFuncID + 1);
  });

  it('Has only unique function IDs in the file', async () => {
    const expectedRows = await csvFuncs.getAllRows(expectedPath);

    // Use Set, since Sets contain no duplicates
    const seenIDs = new Set();

    expectedRows.forEach((row) => {
      expect(seenIDs.has(row.funcID)).toBe(false); // Check that the ID has not been seen before
      seenIDs.add(row.funcID); // Add the ID to the set (whether seen before or not)
    });
  });

  it('Has all headers set to the correct things', async () => {
    const expectedRows = await csvFuncs.getAllRows(expectedPath);

    // Assuming the first row exists and using Object.keys to get headers
    const actualHeaders = Object.keys(expectedRows[0]);

    const expectedHeaders = [
      'funcID',
      'appName',
      'funcName',
      'funcFreq',
      'userID',
      'warmerOn',
      'funcUrl',
    ];

    expect(actualHeaders).toEqual(expectedHeaders);
  });

});
