const fs = require ('fs')
const path = require('path'); 
const csvFuncs = require(path.resolve(__dirname, './csvFuncs.js'));
const parse = require ('csv-parser');
const {stringify} = require('csv-stringify/sync'); 

const configController = {}; 
let funcID; 
// setting up headers for the user file that lists all the functions for a single user
const heading = [{key: 'funcID'}, {key: 'appName'}, {key: 'funcName'}, {key: 'funcFreq'}, {key: 'userID'}]; 

// middleware that takes information from the configure page POST request body and saves information where is is required. 
configController.addNew = async (req, res, next) => {

    try {
        // keeping userID hardcoded for now until we work out authentication 
        const userID = 'abc123'
        // deconstructing information from body 
        const {appName, funcName, funcUrl, funcFreq} = req.body; 

        // if user file does not exist create file and set up file headers 

        // check if file already exists 
        const fileName = path.resolve(__dirname, `../storage/${userID}.csv`); 

        if (!fs.existsSync(fileName)){
            funcID = 1
            fs.appendFileSync(fileName, stringify([{funcID,appName,funcName,funcFreq,userID}], {header: true, columns: heading}),'utf-8', (err)=>{
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
            funcID = parseInt(records[records.length-1].funcID) + 1;  
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


// If the user wants to edit the frequency the function is pinged, 
configController.editFunc = async (req, res, next) => {
    try {
        const userID = 'abc123';  
    const {funcID, funcURL, funcFreq} = req.body 
    const fileName = path.resolve(__dirname, `../storage/${userID}.csv`); 
    
    // get array of all functions in the users file 
    const records = await csvFuncs.getAllRows(fileName); 
    
    // iterate through records to get object with funcID
    let selectedIndex; 
    records.forEach((element, index) => { 
        if (element.funcID === funcID.toString()) {
            selectedIndex = index;
            return selectedIndex;  
        }
    });

    // if new frequency is specified, update the frequency of the function and re-write file
    if (funcFreq){
        records[selectedIndex].funcFreq = funcFreq; 
        fs.writeFileSync(fileName, stringify(records, {header: true, columns: heading} , function (err, str) {
            if (err) {
                console.log(err); 
            } else {
                console.log('added new record')
            } }))
    }

    // if new URL is specified, update the env file 
    // need to test this have not checked if this works
    // if (funcURL) {
    //     const name =`${funcID}URL` 
    //     process.env.name = `${funcUrl}`; 
    // }
    return next(); 

    } catch (err) {
        return next({
            log: `Error in middleware ${err}`,
            status: 500,
            message: `Error in edit function middleware`,
        }); 

    }
}



module.exports = configController; 