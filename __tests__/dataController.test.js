const dataController = require('../server/controllers/dataController');

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should should call next one time.', async () => {
    await dataController.getRuns(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('Should set res.locals.all to the result of csvFuncs.getAllRows().', async () => {
    await dataController.getRuns(req, res, next);
    expect(res.locals.all.length).toBe(3);
  });
});
