import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DailyPerformance = ({
  data,
  avgLatencyM,
  avgLatencyT,
  avgLatencyW,
  avgLatencyTh,
  avgLatencyF,
  avgLatencyS,
  avgLatencySu,
}) => {
  // setup series
  const series = [
    {
      name: 'Average Latency',
      data: [
        avgLatencyM,
        avgLatencyT,
        avgLatencyW,
        avgLatencyTh,
        avgLatencyF,
        avgLatencyS,
        avgLatencySu,
      ],
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
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yaxis: {
      title: {
        text: 'Average Latency (ms)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' ms';
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
