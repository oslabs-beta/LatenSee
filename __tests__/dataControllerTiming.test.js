/**
 * This file tests the timing of running a request to /api/data. Note that the server 
 * needs to be running, and there is a long-running test that can be skipped if desired.
 * In order to run properly, this file needs to be ran while the server is live.
 *
 */

const request = require('supertest');
const app = require('../server/server');
const server = require('../server/server');

/**
 * Helper function that runs the actual fetch request.
 * @returns data response object from fetching /api/data
 */
const runTest = async () => {
  const response = await request(app).get('/api/data');
  return response.body[0];
};

/**
 * 
 * @returns an array of recorded times for completing the runTest function
 */
const timeRuns = async () => {
  // delcare an empty array of timing
  let timingResults = [];

  // on a loop, call runTest with timing, and push result to array
  for (let i = 0; i < 20; i++) {
    let startTime = Date.now();
    await runTest();
    let endTime = Date.now();
    timingResults.push(endTime - startTime);
  }

  // return array of timing
  return timingResults;
};

describe('Test to time responses to dataController.getRuns()', () => {

  afterAll(() => server.close());


  it('Should be able to run a request to api/data ', async () => {
    const result = await runTest();
    expect(Array.isArray(result)).toBe(true);
  });

  it('Should have an average timing less than 500ms', async () => {
    const timingArray = await timeRuns();
    const average = timingArray.reduce((a, b) => a + b) / timingArray.length;
    expect(average).toBeLessThan(500);
  }, 100000);
});
