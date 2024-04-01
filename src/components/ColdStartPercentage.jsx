// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// //accepting props passing down from Overview component
// const WeeklyColdWarmRatio = ({ coldStartLastWeek, coldStartThisWeek }) => {
//   //setup series
//   const series = [coldStartData, warmStartData];

//   const options = {
//     chart: {
//       type: 'donut',
//     },
//     labels: ['Cold Starts', 'Warm Starts'],
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200,
//           },
//           legend: {
//             position: 'bottom',
//           },
//         },
//       },
//     ],
//   };

//   return (
//     <div id="weekly-cold-start-chart">
//       <ReactApexChart options={options} series={series} type="donut" />
//     </div>
//   );
// };

// export default WeeklyColdWarmRatio;

import React from 'react';

//accepting props from Overview component
const ColdStartPercentage = ({
  data,
  coldStartPercentagelastWeek,
  coldStartPercentagethisWeek,
}) => {
  // calculate the percentage increase or decrease
  const percentageChange =
    coldStartPercentagethisWeek - coldStartPercentagelastWeek;

  // color change based on positive or negative
  const color = percentageChange <= 0 ? 'green' : 'red';
  // text change based on positive or negative
  const increaseDecreaseText = percentageChange >= 0 ? 'increase' : 'decrease';

  return (
    <div className="coldStart-percentage-change">
      <div style={{ color, fontSize: '24px', textAlign: 'center' }}>
        {percentageChange.toFixed(2)}%
      </div>
      <div style={{ color, fontSize: '14px', textAlign: 'center' }}>
        {increaseDecreaseText} in cold starts
      </div>
    </div>
  );
};

export default ColdStartPercentage;
