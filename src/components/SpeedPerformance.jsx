import React from 'react';

//accepting props (dataThisWeek, dataLastWeek) from Overview component
const SpeedPerformance = ({ dataThisWeek, dataLastWeek }) => {
  //hanlde case when data is not available yet
  if (!dataThisWeek || !dataLastWeek) {
    return <div>Loading...</div>;
  }
  // calculate the percentage
  const percentageChange =
    ((dataThisWeek.avLatency - dataLastWeek.avLatency) /
      dataLastWeek.avLatency) *
    100;

  // color change based on positive or negative
  const color = percentageChange >= 0 ? 'green' : 'red';
  // text change based on positive or negative
  const increaseDecreaseText = percentageChange >= 0 ? 'increase' : 'decrease';

  return (
    <div className="latency-percentage-change">
      <div style={{ color, fontSize: '24px', textAlign: 'center' }}>
        {percentageChange.toFixed(2)}%
      </div>
      <div style={{ color, fontSize: '14px', textAlign: 'center' }}>
        performance {increaseDecreaseText} since last week
      </div>
    </div>
  );
};

export default SpeedPerformance;
