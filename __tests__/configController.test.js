// Reference dataController.test.js: https://github.com/oslabs-beta/LatenSee/blob/evan/refactorGetRuns/__tests__/dataController.test.js

const fs = require('fs');
const path = require('path');

const configController = require('../server/controllers/configController');
const csvFuncs = require('../server/controllers/csvFuncs');

describe('configController.addNew', () => {
  xit('The first time a new users adds a function, it creates a users csv file and saves the function to it', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    // create a fake request body, with the parameters:
    req.body = {
      appName: 'TestApp',
      funcName: 'TestFunc1',
      funcUrl: 'http://testfunc1.com',
      funcFreq: '10S',
      warmerOn: 'Yes',
      userID: 'Test123',
    };

    console.log('req is now: ', req);
    // we should run the addNew method, with a reqBody for a new user's function
    configController.addNew(req, res, next);

    // expect: a new file exists at the new user's csv
    const expectedPath = path.resolve(
      __dirname,
      '../server/storage/test123.csv'
    );
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

  xit('Adds a new function to the existing CSV file', () => {});

  xit('The newest function has an ID which is one higher than the previous function', () => {});

  xit('Has only unique function IDs in the file', () => {});

  xit('Has all headers set to the correct things', () => {});

  xit('If no warmerOn status is provided in the body, will default to Yes', () => {});
});

/**
 * 
 *     // create a variable for the path where we expect the abc123.csv to live
    const expectedPath = path.resolve(
      __dirname,
      '../server/storage/abc123.csv'
    );

    // expect there to exist a file at the abc123.csv path
    expect(fs.existsSync(expectedPath)).toBe(true);
 */
