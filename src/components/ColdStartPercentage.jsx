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
