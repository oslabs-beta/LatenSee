const csvFuncs = {};

// returns array of objects, each object is a row with key = column name and value = value in cell
csvFuncs.getAllRows = async (fileName) => {
  
}

/**
 *
 * Given a function id, startdate string and enddate string, returns number of runs in that period
 *
 * @param {number} funcID : number
 * @param {number} startDate : the time in miliseconds that represents start of period of calculation
 * @param {number} endDate : the time in miliseconds that represents end of period of calculation
 */
csvFuncs.getTotalRuns = (arr, funcId, startDate, endDate) => {

}

/**
 *
 * Given an array of rows, return the number of rows that are between the specified dates, of the specified function and are cold/warm
 *
 * @param {rows[]} arr - array of rows
 * @param {number} funcID - function you would like to get a total for
 * @param {boolean} value - if looking for cold (true) or warm starts (false)
 * @param {number} startDate - start time of the period in milliseconds
 * @param {number} endDate - end time of the period in milliseconds
 * @returns {number} - number of rows that match the above conditions
 */
csvFuncs.getCold = (arr, funcID, value, startDate, endDate) => {

}

/**
 * Given a start/end date, give the total of a specified column filtered by pings which are either cold or warm starts.
 *
 * @param {rows[]} arr - array of rows
 * @param {number} funcID - number uniquely identifying a particular function
 * @param {string} avColumn - the that the user would like to have totalled
 * @param {number} startDate - start time of the period in milliseconds
 * @param {number} endDate - end time of the period in milliseconds
 * @param {boolean} cold - If you want the function to be looking at coldstarts or warm (defaults to warm)
 * @returns A number representing the total of AvColumn between the given dates filtered on cold status passed in (defaulting to true)
 */
csvFuncs.getSum = (arr, funcID, avColumn, startDate, endDate, cold = false) => {

}

module.exports = csvFuncs;