const runTest = async () => {
  const response = await fetch('http://localhost:3000/api/data');
  const data = await response.json();
  return data[0];
};

const timeRuns = async () => {
  // delcare an empty array of timing
  let timingResults = [];

  // on a loop, call runTest with timing, and push result to array
  for(let i = 0; i < 20; i++) {
    let startTime = Date.now();
    await runTest();
    let endTime = Date.now();
    timingResults.push(endTime - startTime);
  }

  // return array of timing
  return timingResults;
}

describe('Test to time responses to dataController.getRuns()', () => {

  it('Should be able to run a request to api/data ', async () => {
    const result = await runTest();
    expect(Array.isArray(result)).toBe(true);
  })

  it('Should have an average timing less than 10,000ms', async () => {
    const timingArray = await timeRuns();
    const average = timingArray.reduce((a, b) => a + b) / timingArray.length;
    console.log('Timing results is: ', timingArray);
    console.log('Average time is: ', average);
    expect(average).toBeLessThan(10000);
  }, 100000)

});