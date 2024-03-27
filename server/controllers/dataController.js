// require needed modules
const fs = require('fs'); 
const parse = require ('csv-parser');


const dataController = {}; 

// middleware that gets the data on our lamda function from the ENV file 
dataController.getData = async (req, res, next)=>{ 
    // INTERNAL NOTES - TO DELETE 
    // In the future will implement way to get data for each individual function by ID. currently only have one function. 
    try { 
        const results = []; 
    fs.createReadStream('data.csv')
      .pipe(parse())
      .on('data', (data)=> results.push(data))
      .on('end', ()=>{
        res.locals.funcData = results; 
        // console.log("from controller", res.locals.funcData);  
        return next(); 
      })
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