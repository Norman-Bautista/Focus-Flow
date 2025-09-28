
import Charts from 'react-apexcharts';


const days = [
  {day:"Mon", totalCycles: 10, timeSpent: 4 },
  {day:"Tues", totalCycles: 6, timeSpent: 3 },
  {day:"Wed", totalCycles: 13, timeSpent: 6 },
  {day:"Thurs", totalCycles: 10, timeSpent: 4 },
  {day:"Fri", totalCycles: 10, timeSpent: 4 },
  {day:"Sat", totalCycles: 10, timeSpent: 4 },
  {day:"Sun", totalCycles: 10, timeSpent: 4 },
]

const chartOptions = {
  chart: {
    type: "bar",
    toolbar: {show: false},
  },
  plotOptions: {
    bar : {
      horizontal: false,
      borderRadius: 10,
      dataLabels: {
        position: 'center',
      }
    }
  },
  xaxis: {
    categories: days.map((d) => d.day),
    position:'bottom',

  }
}

const chartSeries = [
  {
    name: "Pomodoro Sessions",
    data: days.map((day) => day.totalCycles),
  },
  {
    name: "Hours Spent",
    data: days.map((day) => day.timeSpent),
  },
];


const DayChart = () => {
  return (
    <Charts options={chartOptions} series={chartSeries} type="bar" height={500} width={390} />
  )
}

export default DayChart