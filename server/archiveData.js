const csvFuncs = require ("./controllers/csvFuncs")
const fs = require('fs');
const path = require('path');
const { stringify } = require('csv-stringify/sync');


// define constants 
const DAYStoMS = 86400000;
const datafileName = path.resolve(__dirname, `./storage/data.csv`)
const archiveFileName = path.resolve(__dirname, `./storage/archive.csv`)
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
 * Every day at 11:59 pm this function checks the CSV file for data that is dated today minus ARCHIVE PERIOD 
 * This function adds this data to the archive.csv and deletes the data from the data.csv file 
 * 
 * @param {*} req express request object
 * @param {*} res express response object
 * @param {*} next express next object
 * @returns
 * 
 */

const archiveData = async () => {
    // define archive time as 23:59 
    const archHour = 23; 
    const archMin = 59; 

    // get current time in hours and minutes 
    const now = new Date();
    const currHour = now.getHours(); 
    const currMin = now.getMinutes(); 
    
    // if current time is not equal to 11:59 pm then return 
    // if (currHour !== archHour || currMin !== archMin) return 
    // otherwise start archive process 

    // define period of archive for (for example, 2 weeks of data is equal to today - 14 days day converted to millisecs)
    const archivePeriod = 7 // in days 
    const archivePeriodMS = (archivePeriod + 1) * DAYStoMS // added 1 day so it is period inclusive of 1st day 
    // set the cut off date before which all data will be archived 
    const targetArchDate = now - archivePeriodMS; 

    console.log('target date', targetArchDate, new Date(targetArchDate))
    // console.log('last date on archive', new Date(1712609100061))
    console.log('last date on datafile', new Date(1713139270039))

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
    console.log(newRecords)
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
    // check records sum up to the correct ammount 
    console.log("data was correctly archived: ", (newRecords.length + addArchive.length) === records.length)
    }
    else {
        console.log("no data to archive"); 
    }
    

    
}

archiveData(); 
