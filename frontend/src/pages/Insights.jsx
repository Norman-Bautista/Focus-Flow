import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import MonthlyChart from '../SampleData/MonthlyChart.jsx';
import SessionChart from '../SampleData/SessionChart.jsx';
import DayChart from '../SampleData/DayChart.jsx';
import {
  LocalFireDepartment as StreakIcon
} from '@mui/icons-material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#D6EFC7",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  borderRadius: "1rem",
  color: (theme.vars ?? theme).palette.text.primary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Insights = () => {
  return (
    <main>
      {/* Grid: 12 cols, auto rows */}
      <div className="grid grid-cols-12 auto-rows-auto gap-4">
  
        {/* 📊 Monthly Focus Snapshot (magenta left top, spans 2 rows) */}
        <div className="col-span-8 row-span-1">
          <Item>
            <header className="mb-4 font-sans font-semibold text-lg">
              Monthly Focus Snapshot
            </header>
            <MonthlyChart />
          </Item>
        </div>

        {/* 🔥 Consistency (magenta right top) */}
        <div className="col-span-4 row-span-1 ">
          <Item className="h-[370px] flex flex-col items-center justify-center gap-4">
            <p className="font-sans font-semibold text-xl text-shadow">Consistency Rate</p>
            <h1 className="font-sans font-bold text-xl text-shadow">88%</h1>
            <p className="font-sans text-lg">14-day streak
              <StreakIcon className='text-orange-500'/>
              </p>
          </Item>
        </div>

        {/* 🤖 AI Insights (orange, bottom-left) */}
        <div className="col-span-4 row-span-1">
          <Item className='h-[600px] flex flex-col items-center'>
            <header className="my-12 text-shadow text-xl font-sans font-semibold">
              Flow AI Summary
            </header>
            <p className='font-sans text-2xl p-8 text-shadow'>
              You’re most consistent mid-week, averaging 12 cycles on Wed/Thu. 
              Friday productivity drops by 25%. Your best rhythm is 25min sessions. 
              Keep streaking! 🔥
            </p>
          </Item>
        </div>

        {/* 🎯 Pomodoro Effectiveness (light blue, bottom-middle) */}
        <div className="col-span-4 row-span-1">
          <Item className='h-[600px] flex flex-col items-center'>
            <header className="my-16 font-sans font-semibold text-xl text-shadow">
              Pomodoro Effectiveness
            </header>
            <SessionChart />
          </Item>
        </div>

           {/* 📆 Most Productive Day (yellow, tall right under consistency) */}
        <div className="col-span-4 row-span-1">
          <Item className='h-[600px] flex flex-col items-center'>
            <header className="my-4 font-sans font-semibold text-xl text-shadow">
              Most Productive Day
            </header>
            <DayChart />
          </Item>
        </div>
      </div>
    </main>
  );
};

export default Insights;
