import React from 'react';
import ReactApexChart from 'react-apexcharts';

// accepting data as a prop
const Chart = ({ data, height, width = '100%' }) => {
  // handle cases when response data has not come back yet, or reponse data array is empty
  if (!data || data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  //see what data looks like
  console.log('This is data passing down from Dashboard: ', data);

  // setup series (what's on y-axis)
  const series = [
    {
      name: 'Function id 1',
      data: data.map((item) => item[1]),
    },
    {
      name: 'Function id 4',
      data: data.map((item) => item[4]),
    },
  ];

  //setup categories (what's on x-axis)
  const categories = data.map((item) => item.day);

  //setup chart type, assign series, assign xaxis
  const options = {
    chart: {
      type: 'line',
      toolbar: { show: false },
    },
    series: series,
    xaxis: {
      categories: categories,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={height}
        width={width}
      />
    </div>
  );
};

export default Chart;
