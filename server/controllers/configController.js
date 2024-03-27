const fs = require ('fs')
const path = require('path'); 
const csvFuncs = require(path.resolve(__dirname, './csvFuncs.js'));
// const initializeJobs = require('./runJobs') 
const parse = require ('csv-parser');

const {stringify} = require('csv-stringify/sync'); 

const configController = {}; 
let funcID; 

// middleware that takes information from the configure page POST request body and saves information where is is required. 
configController.addNew = async (req, res, next) => {

    try {
        // keeping userID hardcoded for now until we work out authentication 
        const userID = 'abc123'
        // deconstructing information from body 
        const {appName, funcName, funcUrl, funcFreq} = req.body; 

        // if user file does not exist create file and set up file headers 
        
        // setting up headers 
        const heading = stringify([], {header: true, columns: [{key: 'funcID'}, {key: 'appName'}, {key: 'funcName'}, {key: 'funcFreq'}, {key: 'userID'}] }, function (err, str) {
            return str}); 

        // check if file already exists 
        const fileName = path.resolve(__dirname, `../storage/${userID}.csv`); 

        if (!fs.existsSync(fileName)){
            fs.appendFileSync(fileName, heading, 'utf-8', (err)=>{
                if (err) console.log(err); 
                else {
                    console.log('function data saved')
                };
            })  
        }
        else {
            // if user file exists,
            // first check last id and create id for func
            const records = await csvFuncs.getAllRows(fileName)
            if (!records) {
                funcID = 1; 
            } else {
                funcID = parseInt(records[records.length-1].funcID) + 1;  
            }
            // then append funcID, userID, appName, funcName and funcFreq to user's file)
            fs.appendFileSync(fileName, stringify([{funcID,appName,funcName,funcFreq,userID}], {header: false}, function (err, str) {
                if (err) {
                    console.log(err); 
                } else {
                    console.log('added new record')
                } }))

            // append funcURL to .env file with unique name 'funcID-URL'
            fs.appendFileSync('.env', `${funcID}URL = '${funcUrl}'\n`)
        }
        return next(); 
        
        } catch (err) {
            return next({
                log: `Error in middleware ${err}`,
                status: 500,
                message: `Error in middleware`,
            }); 
        }

}

module.exports = configController; 