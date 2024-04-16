const csvFuncs = require ("./controllers/csvFuncs")
const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const { stringify } = require('csv-stringify/sync');



// define constants 
const archiveFileName = path.resolve(__dirname, `./storage/archive.csv`)
const ARCHIVE_PERIOD = 14; // IN DAYS - note that the formula below adds + 1 to archive period to make sure it is inclusive of the day 
const ARCHIVING_TIMES = [
  {hour: 5, minute:59, second:1},
  {hour: 11, minute:59, second:1},
  {hour: 17, minute:59, second:1}, 
  {hour: 23, minute:59, second:1},
] // set to every 6 hours
const datafileName = path.resolve(__dirname, `./storage/data.csv`)
const DAYStoMS = 86400000;
const heading = [
  { key: 'funcID' },
  { key: 'name' },
  { key: 'cold' },
  { key: 'invokeTime' },
  { key: 'serverStart' },
  { key: 'serverEnd' },
  { key: 'serverDifference'},
  ]

  


/**
 *
 * Function schedules automatic archiving of data from the data.csv file 
 * Every day at 5:59 am, 11:59pm, 5:59 pm and 11:59 am this function checks the CSV file for data that is dated today minus ARCHIVE PERIOD 
 * This function adds this data to the archive.csv and re-writes the data file to delete this data from the data.csv file 
 * archivePeriod is set to 2 weeks, inclusive. For example if to day is Monday, we can see data for today up to past 2 Mondays 
 * 
 * 
 */

const archiveData = async () => {
    // get current time in hours and minutes 
    const now = new Date();
    // define period of archive for (for example, 2 weeks of data is equal to today - 14 days day converted to millisecs)
    const archivePeriod = ARCHIVE_PERIOD // in days 
    const archivePeriodMS = (archivePeriod + 1) * DAYStoMS // added 1 day so it is period inclusive of 1st day 
    // set the cut off date before which all data will be archived 
    const targetArchDate = now - archivePeriodMS; 

    console.log('target archive date', new Date(targetArchDate).toString())
    

    // get data from csv file 
    let records = await csvFuncs.getAllRows(datafileName)
    const addArchive = []
    let newRecords = []
    records.forEach((row, index) => {
        if (parseInt(row['invokeTime'])< targetArchDate){
            // add to archive array 
            addArchive.push(row)
            // delete from records array 
            newRecords = records.slice(index+1)
        }
    });
    // when done iterating through the file 
    if (addArchive.length > 0) {
        // rewrite the data file with the updated records array 
    fs.writeFileSync(
        datafileName,
        stringify(
          newRecords,
          { header: true, columns: heading },
          function (err, str) {
            if (err) {
              console.log(err);
            } else {
              console.log('archived data removed from data file');
            }
          }
        )
      );
    // append addArchive data to the archive file 
    if (!fs.existsSync(archiveFileName)){
        fs.appendFileSync(
            archiveFileName,
            stringify(
                addArchive, 
                {header: true, columns: heading, }
            ),
            'utf-8',
            (err) => {
              if (err) console.log(err);
              else {
                console.log('new archive file saved');
              }
            }
          );
    } else {
        fs.appendFileSync(
            archiveFileName,
            stringify(
                addArchive, 
                {header: false, columns: heading, }
            ),
            'utf-8',
            (err) => {
              if (err) console.log(err);
              else {
                console.log('new archive file saved');
              }
            }
          );

    }
    // check records sum up to the correct ammount and log a message
    console.log("data was correctly archived: ", (newRecords.length + addArchive.length) === records.length, "archived at:", now.toString(), "archiving process took:", Date.now()-now, "seconds")
    }
    else {
       // if no records to add to arcgive, display message
        console.log("no data to archive"); 
    }
    

    
}

// schedule archiving 
const startArchive = () => {
  ARCHIVING_TIMES.forEach(time => {
    schedule.scheduleJob({hour:time.hour, minute:time.minute, second:time.second}, ()=> archiveData()); 
  })
    
}

module.exports = startArchive; 
