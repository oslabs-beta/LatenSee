import React from 'react';
import ColdStartPercentage from './ColdStartPercentage';
import SpeedPerformance from './SpeedPerformance';
import DailyPerformance from './DailyPerformance';

//accepting props (data) from Dashboard
const OverviewPanel = ({ data, periodicData }) => {
  //destructuring and naming first object dataThisWeek, second object dataLastWeek
  const [dataThisWeek, dataLastWeek] = data;

  const averageLatencyEachDay = () => {
    //store 7 objects {day: xxx, average: xxx}
    const avLatEachDay = [];
    //run for loop starting at the back of array
    for (let i = periodicData.length - 1; i >= 0; i--) {
      //get all keys in current object except 'day'
      const keys = Object.keys(periodicData[i]).filter((key) => key !== 'day');
      //call reduce method on keys array: adding up value corresponding to current key
      const sum = keys.reduce((total, key) => total + periodicData[i][key], 0);
      const average = sum / keys.length;
      //push object into avLatEachDay array
      avLatEachDay.push({
        day: periodicData[i].day,
        average,
      });
    }
    return avLatEachDay;
  };

  // console.log('i am avLatEachDay: ', averageLatencyEachDay());

  return (
    <div>
      <div className="daily-performance">
        <DailyPerformance averageLatencyEachDay={averageLatencyEachDay()} />
      </div>
    </div>
  );
};

export default OverviewPanel;
