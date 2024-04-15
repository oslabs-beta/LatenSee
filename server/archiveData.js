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

const archiveData = () => {
    // define archive time as 23:59 
    const archHour = 23; 
    const archMin = 59; 

    // get current time in hours and minutes 
    const now = new Date();
    const currHour = now.getHours(); 
    const currMin = now.getMinutes(); 
    
    // if current time is not equal to 11:59 pm then return 
    if (currHour !== archHour || currMin !== archMin) return 
    // otherwise start archive process 
    // get data from csv file 
    // const records = 


   

}

archiveData(); 
