/**
 * This file is repsonsible for unit testing functiosn in the dataController.
 * It relies upon mocking functions that this relies upon (i.e. csvFuncs).
 */

const dataController = require('../server/controllers/dataController');

// We want to mock the csvFuncs controller
jest.mock('../server/controllers/csvFuncs');

/**
 * Testing getRuns within the dataController
 *
 */
describe('Data Controller: getRuns Unit Tests', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should set res.locals.all to the result of csvFuncs.getAllRows() and next() to be called once.', async () => {
    await dataController.getRuns(req, res, next);
    // Result is mocked in server/controllers/__mocks__/csvFuncs.js
    expect(res.locals.all).toEqual([1, 2, 3]);
  });

  it('Should should call next one time.', async () => {
    await dataController.getRuns(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should have the name records in res.locals.runs as in res.locals.records', async () => {
    await dataController.getRuns(req, res, next);
    const resultingCalcs = res.locals.runs;
    // Same length as input records
    expect(res.locals.runs.length).toBe(3);

    // Element has at least one of the three combos manually included but not any more
    const includesInput = (current) => {
      return (
        (current.id === '1' && current.name === 'MockFunc1') ||
        (current.id === '2' && current.name === 'MockFunc2') ||
        (current.id === '3' && current.name === 'MockFunc3')
      );
    };
    expect(res.locals.runs.every(includesInput)).toBe(true);
  });
});
