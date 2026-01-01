
import React from "react";
import Chart from "react-apexcharts";

const SessionChart = () => {
    
    const [state, setState] = React.useState({
          
            series: [44, 55, 13, 33],
            options: {
              chart: {
                width: 380,
                type: 'donut',
              },
              dataLabels: {
                enabled: false
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    show: false
                  }
                }
              }],
              legend: {
                position: 'right',
                offsetY: 0,
                height: 230,
              }
            },    
        });
  
  return (
    <Chart options={state.options} series={state.series} type="donut" width={380}/>
  )
}

export default SessionChart