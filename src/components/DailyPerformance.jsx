import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DailyPerformance = ({ averageLatencyEachDay }) => {
  // setup series. call map on averageLatencyEachDay to populate the y axis
  const series = [
    {
      name: 'Average Latency',
      data: averageLatencyEachDay.map((data) => data.average),
    },
  ];
  // Chart options
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    //call map on averageLatencyEachDay to populate the x-axis
    xaxis: {
      categories: averageLatencyEachDay.map((data) => data.day),
    },
    yaxis: {
      title: {
        text: 'Average Latency (milliseconds)',
      },
      labels: {
        formatter: (val) => {
          return val.toFixed(1);
        },
      },
    },
  };

  return (
    <div className="daily-performance">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default DailyPerformance;
