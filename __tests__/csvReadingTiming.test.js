/**
 * This file tests how long it takes to read from a pre-determined data.csv file.
 * The purpose of this test is to determine a baseline server time necessary to read
 * all lines in a given file, and determine the limit of optimization in other parts
 * of the application's functionality
 */

const fs = require('fs');
const path = require('path');
const parse = require('csv-parser');



const readCSVFile = async (fileName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(fileName)
      .pipe(parse())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      });
  });
};



const timeRuns = async () => {
  let timingResults = [];

    for (let i = 0; i < 20; i++) {
      let startTime = Date.now();

      await readCSVFile(path.resolve(__dirname, `../server/storage/data.csv`));

      let endTime = Date.now();
      timingResults.push(endTime - startTime);
    }

  return timingResults;
}


describe('Test the average time to read data.csv', () => {
  it('Should be able to read ~200k rows in <350ms', async () => {
    const timingArray = await timeRuns();

    const average = timingArray.reduce((a, b) => a + b) / timingArray.length;
    console.log('Timing results of readingCSV is: ', timingArray);
    console.log('Average time of  readingCSV is: ', average);
    expect(average).toBeLessThan(350);
  }, 100000)

});