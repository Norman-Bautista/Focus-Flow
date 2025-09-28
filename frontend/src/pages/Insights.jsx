import {
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MonthlyChart from '../SampleData/MonthlyChart.jsx';
import SessionChart from '../SampleData/SessionChart.jsx';
import DayChart from '../SampleData/DayChart.jsx';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#D6EFC7",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: "1rem",
  color: (theme.vars ?? theme).palette.text.primary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Insights = () => {
  return (
    <main className="min-h-screen px-4 pt-4">
        <Grid container spacing={2}>
          {/* 📊 Monthly Focus Snapshot - Large Tile */}
          <Grid item size={8} xs={12} md={8} lg={8}>
            <Item>
              <header className="mb-4">
                <p className="font-sans font-semibold text-shadow text-lg">
                  Monthly Focus Snapshot
                </p>
              </header>
              <MonthlyChart />
            </Item>
          </Grid>

          {/* 🔥 Consistency & Streak */}
          <Grid item size={4} xs={12} md={4} lg={4}>
            <Item className="flex flex-col items-center gap-2">
              <header>
                <p className="font-sans font-semibold text-shadow">
                  Consistency Rate
                </p>
              </header>
              <h1 className="font-sans font-bold text-3xl text-shadow">88%</h1>
              <p className="font-sans text-shadow">14-day streak</p>
            </Item>
          </Grid>
          
          {/* 🎯 Pomodoro Effectiveness */}
          <Grid item xs={12} md={6} lg={4}>
            <Item>
              <header className="mb-2">
                <p className="font-sans font-semibold text-shadow">
                  Pomodoro Effectiveness
                </p>
              </header>
              <SessionChart />
            </Item>
          </Grid>
          

          {/* 📆 Most Productive Day */}
          <Grid item xs={12} sm={6} lg={4}>
            <Item>
              <header className="mb-2">
                <p className="font-sans font-semibold text-shadow">
                  Most Productive Day
                </p>
              </header>
              <DayChart />
            </Item>
          </Grid>

          {/* 🤖 AI Insights */}
          <Grid item xs={12} md={12} lg={8}>
            <Item>
              <header className="mb-2">
                <p className="text-xl text-shadow font-sans font-semibold">
                  Flow AI Summary
                </p>
              </header>
              <p>
                You’re most consistent mid-week, averaging 12 cycles on Wed/Thu. 
                Friday productivity drops by 25%. Your best rhythm is 25min sessions. 
                Keep streaking! 🔥
              </p>
            </Item>
          </Grid>
        </Grid>
    </main>
  );
};

export default Insights;
