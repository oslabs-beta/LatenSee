// require needed modules
const fs = require('fs'); 
const parse = require ('csv-parser');
const path = require('path');
const { getTotalRuns } = require('./csvFuncs');
const csvFuncs = require(path.resolve(__dirname, './csvFuncs.js'));

const userID = 'abc123'
const datafileName = path.resolve(__dirname, `../storage/data.csv`);
const userfileName = path.resolve(__dirname, `../storage/${userID}.csv`); 


const dataController = {}; 

// middleware that gets the data on our lamda function from the ENV file 
dataController.getData = async (req, res, next)=>{ 
    try { 
      const x = await csvFuncs.getAllDaily (0, Date.now(), userfileName, datafileName)
      
      console.log(x); 
      
  
    }
    catch (err){
        return next({
            log: `Error in dataController within getData: ${err}`, 
            status: 500, 
            message: 'Error in dataController within getData '
        })

    }
      
}

module.exports = dataController; 