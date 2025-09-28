import Chart from 'react-apexcharts';
import {
  Box, Card, Paper, Grid
} from '@mui/material';
import {styled} from '@mui/material/styles'

const monthlyData = [
  {month: "m1", totalCycle: 43, totalStreak: 14},
  {month: "m2", totalCycle: 29, totalStreak: 22},
  {month: "m3", totalCycle: 32, totalStreak: 30},
  {month: "m4", totalCycle: 17, totalStreak: 9},
];


const chartOptions = {
  chart: {
    type: "line",
    toolbar: { show: false },
  },
  stroke: {
    curve: "straight",
  },
  xaxis: {
    categories: monthlyData.map((d) => d.month),
  },
};

const chartSeries = [
  {
    name: "Total Cycles",
    data: monthlyData.map((d) => d.totalCycle),
  },
  {
    name: "Total Streaks",
    data: monthlyData.map((d) => d.totalStreak),
  },
];

const Insights = () => {

  const Item = styled(Paper)(({theme})=> ({
    backgroundColor: "#D6EFC7",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.primary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
  }),
  }));

  return (
    <main className='flex flex-row gap-4 justify-center'>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={1}>
          {/* Monthly Focus Snapshot (changable to weekly and quarterly, premium for 1yr stat*/}
          <Grid>
            <Item>
              <header>
                <p>Monthly Focus Snapshot</p>
              </header>
              {/* Chart */}
              <div>
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  height={300}
                />

                
              </div>

              {/* Time-period btns */}
              <div>

              </div>
            </Item>
          </Grid>

          {/* Consistency Rate and Consecutive Streak (not the total) */}
          <Grid>
            <Item>
              asdasdsadasdas
            </Item>
          </Grid>

          {/* Pomodoro Session Effectiveness */}
          <Grid>
            <Item>
              asdasdsadasdas
            </Item>
          </Grid>

          {/* Most Productive Day of Week */}
          <Grid>
            <Item>
              asdasdsadasdas
            </Item>
          </Grid>

          {/* AI insights summarization */}
          <Grid>
            <Item>
              asdasdsadasdas
            </Item>
          </Grid>
        </Grid>
      </Box>
    </main>
  )
}

export default Insights