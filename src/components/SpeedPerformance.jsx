import React from 'react';

//accepting props (dataThisWeek, dataLastWeek) from Overview component
const SpeedPerformance = ({ data }) => {
  const dataThisWeek = data[0]; 
  const dataLastWeek = data[1]; 
  //hanlde case when data is not available yet
  if (!dataThisWeek || !dataLastWeek) {
    return <div>-</div>;
  }
  // calculate the percentage
  const percentageChange =
    (dataThisWeek.avLatency /
      dataLastWeek.avLatency);

  // color change based on positive or negative
  const color = percentageChange >= 0 ? 'green' : 'red';
  // text change based on positive or negative
  const increaseDecreaseText = percentageChange >= 0 ? 'increase' : 'decrease';

  return (
    <div>
       {percentageChange.toFixed(2)}x
    </div>
  );
};

export default SpeedPerformance;
