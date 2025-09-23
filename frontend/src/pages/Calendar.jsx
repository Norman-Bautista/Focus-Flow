import React, { useState } from 'react';
import { Box, Paper, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/* 
we used day.js functions such as year, month and date
then first call the day.js before its functions to initiate
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = generateMonth(year, month);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <main className='flex flex-col'>
      {/* Calendar */}
      <Box className="bg-shadow">
        <header>
          <IconButton onClick={goToPreviousMonth}>
            <Typography>
              <ChevronLeftIcon />
            </Typography>
          </IconButton>

          {currentDate.format}
          
          <IconButton>
            <Typography>
              <ChevronRightIcon />
            </Typography>
          </IconButton>
        </header>
        
      </Box>

      {/* Monthly and Weekly Stat */}
      <Box>
        <Paper className='outline-2 outline-shadow'>
          asdasd
        </Paper>
      </Box>
    </main>
  );
};

export default Calendar;