const csvFuncs = {};

// returns array of objects, each object is a row with key = column name and value = value in cell
csvFuncs.getAllRows = async () => {
  return Promise.resolve([1, 2, 3]);
};

/**
 *
 * Pretend there are 10 total functions
 */
csvFuncs.getTotalRuns = (arr, funcId, startDate, endDate) => {
  return 10;
};

/**
 *
 * Mocking that 5 functions are cold
 */
csvFuncs.getCold = (arr, funcID, value, startDate, endDate) => {
  return 5;
};

/**
 * If we're looking at cold functions, they have 200ms average latency, but warm ones have 100 average latency)
 */
csvFuncs.getSum = (arr, funcID, avColumn, startDate, endDate, cold = false) => {
  return cold ? 5 * 200 : 5 * 100;
};

module.exports = csvFuncs;
