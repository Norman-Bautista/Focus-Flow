;
import Chart from "react-apexcharts";

const MonthlyChart = () => {

  const monthlyData = [
    { month: "m1", totalCycle: 43, totalStreak: 14 },
    { month: "m2", totalCycle: 29, totalStreak: 22 },
    { month: "m3", totalCycle: 32, totalStreak: 30 },
    { month: "m4", totalCycle: 17, totalStreak: 9 },
  ];

  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "straight" },
    colors: ['#184D47', '#FAD586'],
    xaxis: { categories: monthlyData.map((d) => d.month) },
  };

  const chartSeries = [
    { name: "Total Cycles", data: monthlyData.map((d) => d.totalCycle) },
    { name: "Total Streaks", data: monthlyData.map((d) => d.totalStreak) },
  ];

  return <Chart options={chartOptions} series={chartSeries} type="line" height={300} />;
};

export default MonthlyChart;
