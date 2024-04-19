import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DailyPerformance = ({ averageLatencyEachDay }) => {
  
  if (!averageLatencyEachDay || averageLatencyEachDay.length === 0) {
    return <div className='data-loading'>Loading chart data...</div>;
  }

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
      toolbar: {
        offsetX: -15,
        offsetY: -30,  
        tools: {
        download: true,
        other: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false, 
      } },
      height: 350,
      fontFamily: 'Raleway, sans-serif'
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
        text: 'Milliseconds',
        style: {
          fontSize: '0.8rem',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
      labels: {
        formatter: (value) => {
          return new Intl.NumberFormat('US-en').format(value);
        },
      },
    },
  };

  return (
    <div id="chart">
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
