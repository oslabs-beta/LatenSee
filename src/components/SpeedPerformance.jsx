import React from 'react';

//accepting props from Overview component
const SpeedPerformance = ({
  data,
  averageLatencylastWeek,
  averageLatencythisWeek,
}) => {
  // calculate the percentage increase or decrease
  const percentageChange = averageLatencythisWeek - averageLatencylastWeek;

  // color change based on positive or negative
  const color = percentageChange >= 0 ? 'green' : 'red';
  // text change based on positive or negative
  const increaseDecreaseText = percentageChange >= 0 ? 'increase' : 'decrease';

  return (
    <div className="latency-percentage-change">
      <div style={{ color, fontSize: '24px', textAlign: 'center' }}>
        {percentageChange.toFixed(2)}ms
      </div>
      <div style={{ color, fontSize: '14px', textAlign: 'center' }}>
        {increaseDecreaseText} in performance
      </div>
    </div>
  );
};

export default SpeedPerformance;
