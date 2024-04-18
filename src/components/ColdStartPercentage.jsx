import React from 'react';

//accepting props (dataThisWeek and dataLastWeek) from OverviewPanel
const ColdStartPercentage = ({data}) => {
  // console.log('comp', data)
  const dataThisWeek = data[0]; 
  const dataLastWeek = data[1]; 
  // NOTE! handle case where dataThisWeek or dataLastWeek is not available yet
  if (!dataThisWeek || !dataLastWeek) {
    return <div>-</div>;
  }
  // calculate the percentage increase or decrease
  const percentageChange =
    ((dataThisWeek.totalColdStarts / dataLastWeek.totalColdStarts));

  // color change based on positive or negative
  const color = percentageChange <= 0 ? 'green' : 'red';
  // text change based on positive or negative
  const increaseDecreaseText = percentageChange >= 0 ? 'increase' : 'decrease';

  return (
    <div>
        {percentageChange.toFixed(1)}x
    </div>
  );
};

export default ColdStartPercentage;
