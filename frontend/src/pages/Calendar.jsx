import React, { useState } from 'react';
import { Box, Paper, IconButton, Typography, Card } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs().format();

/* 
we used day.js functions such as year, month and date
then first call the day.js before its functions to initiate

we use dayjs() to instantiate many date object format like year, month, date 
in the example below i used dayjs(). then chain year().month().data() to
setn our year month date format

then made a variable to hold first days of month value 
and chain the daysInMonth() to generate days in a month
then firstdayOfWeek value is,  the first day of month.day()
in which generates the 7 days in a week
*/

const generateMonth = (year, month) => {
  const firstDayOfMonth = dayjs().year(year).month(month).date(1);
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const firstDayOfWeek = firstDayOfMonth.day(); 

  const days = [];
  // Add blank days for the start of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }

  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
};

// Mock data for streaks. In a real app, this would come from your backend.
// Key is the day of the month, value is true (completed) or false (not completed)
const mockStreaks = {
  1: true,
  2: true,
  3: false,
  4: true,
  5: true,
  6: true,
  7: true,
  8: false,
  9: true,
  10: true,
  11: true,
  12: false,
  13: true,
  14: true,
  15: true,
  16: false,
  17: true,
  18: true,
  19: true,
  20: true,
  21: false,
  22: true,
  23: true,
  24: true,
  25: false,
  26: true,
  27: true,
  28: true,
  29: false,
  30: true,
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [streakCount, setStreakCount] = useState(0);
  const month = currentDate.month();
  const year = currentDate.year();
  const daysInMonth = generateMonth(year, month);

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const monthlyStreaks = Object.entries(mockStreaks).filter(([day, done]) => {
    const date = dayjs(`${year}-${month + 1}-${day}`, "YYYY-M-D");
    return done && date.month() === month && date.year() === year;
  }).length;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <main className='flex flex-row gap-4 justify-center'>
      {/* Calendar */}
      <Box className="bg-secondary outline-3 outline-shadow rounded-2xl w-6xl p-4 mt-4">
        <header className='flex justify-between'>
          <IconButton onClick={goToPreviousMonth}>
              <ChevronLeftIcon />
          </IconButton>

          <Typography variant='h6' className='font-bold'>
            {currentDate.format('MMMM YYYY')}
          </Typography>

          <IconButton onClick={goToNextMonth}>
              <ChevronRightIcon />
          </IconButton>

        </header>

        <div className="grid grid-cols-7 ">
          {dayNames.map((day) =>(
            <span
              key = {day}
              className='mt-4  text-md font-sans font-bold text-center uppercase tracking-wide text-shadow'
            >
              {day}
            </span> 
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((day, index) => {
            const isStreak = day && mockStreaks[day]; // check if this day has a streak

            return (
              <div
                key={index}
                className="ml-10 h-28 w-16 flex flex-col items-center justify-center"
              >
                <span>{day ? day : ""}</span>
                {isStreak ? (
                  <LocalFireDepartmentIcon className="text-red-500 text-sm" />
                ) : (
                  day && <AcUnitIcon className="text-blue-400 text-sm" />
                )}
              </div>
            );
          })}
        </div>
        
      </Box>

      {/* Monthly and Weekly Stat */}
      <Box className ='flex flex-col gap-12 mt-4 w-90'>
        <Paper className='outline-2 outline-shadow !bg-accent p-4 flex flex-col gap-8'>
          <p className='font-sans font-medium text-shadow '>Monthly Report:</p>
          <p className='font-sans font-medium text-shadow '>Your Total Monthly Streaks: {monthlyStreaks} </p>
          <p className='font-sans font-medium text-shadow'>Your Total Pomodoro Cycles: 64 </p>
        </Paper>
      </Box>
    </main>
  );
};

export default Calendar;