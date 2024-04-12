import React from 'react';
import ReactApexChart from 'react-apexcharts';

// accepting data as a prop
const Chart = ({ data, height, width = '100%' }) => {
  // handle cases when response data has not come back yet, or reponse data array is empty
  if (!data || data.length === 0) {
    return <div className='data-loading'>Loading chart data...</div>;
  }

  // setup series (what's on y-axis)
  const series = [];
  let keys = Object.keys(data[0]);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== 'day') {
      let point = {
        name: keys[i],
        data: data.map((item) => item[keys[i]].toFixed(1)).reverse(),
      };
      series.push(point);
    }
  }

  //setup categories (what's on x-axis)
  const categories = [];
  for (let i = data.length - 1; i >= 0; i--) {
    categories.push(data[i].day);
  }

  //setup chart type, assign series, assign xaxis, title
  const options = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      fontFamily: 'Raleway, sans-serif'
    },
    series: series,
    stroke: {curve: 'smooth' }, // makes the lines smooth instead of straight
    markers: {size: 0,}, // adds circles to mark each data point, currently tuned off = 0
    xaxis: {
      categories: categories,
      
    },
    yaxis: {
      //formatting labels
      labels: {
        formatter: function(value){
          return new Intl.NumberFormat('US-en').format(value); 
        }
      },
      // adding title to y-axis
      title: {
        text: 'Milliseconds',
        //rotate the text
        // rotate: -90,
        style: {
          fontSize: '0.8rem',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
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
