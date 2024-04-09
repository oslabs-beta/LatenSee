const dataController = require('../server/controllers/dataController');
import mockCsvFuncs from '../server/controllers/csvFuncs';


// We want to mock the csvFuncs controller
jest.mock('../server/controllers/csvFuncs');

/**
 * Testing getRuns within the dataController
 *
 */
describe('Data Controller: getRuns Unit Testing', () => {
  // get an array of all functions (records) from res.locals

  // get All Rows from a dataFile each object is a row with a key== column name and value = value in cell

  let req = {};
  let res = { locals: { records: [], runs: [], all: [] } };
  let next;

  /**
   * Reset req, res, and next before each test to validate they are passed in as unit tests
   */
  beforeEach(() => {
    // Mock data from dataController.getData() with three records
    res.locals.records = [
      {
        funcID: '1',
        appName: 'Mock App',
        funcName: 'MockFunc1',
        funcFreq: '10S',
        userID: 'abc123',
        warmerOn: 'Yes',
      },
      {
        funcID: '2',
        appName: 'Mock App',
        funcName: 'MockFunc2',
        funcFreq: '1M',
        userID: 'abc123',
        warmerOn: 'Yes',
      },
      {
        funcID: '3',
        appName: 'Mock App',
        funcName: 'MockFunc3',
        funcFreq: '5M',
        userID: 'abc123',
        warmerOn: 'No',
      },
    ];

    res.locals.runs = [];

    res.locals.all = [];

    // Mock function so we can validate next has been called
    next = jest.fn();
  });

  xit('Should should call next one time.', () => {
    dataController.getRuns(req, res, next);

    expect(next.mock.calls.length).toEqual(1);
  });

  it('Should set res.locals.all to the result of csvFUncs.getAllRows().', async () => {
    console.log('inside second test. Beginning res object is: ', res);
    await dataController.getRuns(req, res, next);
    console.log('inside second test. Ending res object is: ', res);
    console.log('Function checks res.locals.all at ', Date.now());
    expect(res.locals.all.length).toBe(3);
  });
});
