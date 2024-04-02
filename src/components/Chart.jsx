import React from 'react';
import ReactApexChart from 'react-apexcharts';

// accepting data as a prop
const Chart = ({ data, height, width = '100%' }) => {
  // handle cases when response data has not come back yet, or reponse data array is empty
  if (!data || data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  //see what data looks like
  // console.log('This is data passing down from Dashboard: ', data);

  // setup series (what's on y-axis)
  const series = [] 
  let keys = Object.keys(data[0])
  for (let i= 0; i<keys.length; i++){
    
    if (keys[i] !== 'day') {
      let point = {
        name: keys[i], 
        data: data.map (item => item[keys[i]]).reverse()
      }
      series.push(point)
      console.log('point', point)

    }
  }
  console.log('series', series)


  //setup categories (what's on x-axis)
  const categories = [] 
  for (let i = data.length-1; i >= 0; i--){
    categories.push(data[i].day)

  }

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
