import {Router} from 'express';
import { get_All_Timers, get_Timer_Value, update_Timer_Values, clear_Timer, update_Cycle_Longbreak } from './pomodoro.controller';
import authorize_Middleware from '../auth/auth.middleware';

const pomodoro_Routes = Router();

// authorization middleware
pomodoro_Routes.use(authorize_Middleware);

// Get the current timer values (focus, rest, longbreak)
pomodoro_Routes.get('/timer', get_All_Timers);

// Get a specific timer type (e.g. focus, rest, longbreak)
pomodoro_Routes.get('/timer/:type', get_Timer_Value);

// Update a specific timer type (PUT = update)
pomodoro_Routes.put('/timer/:type', update_Timer_Values);

// Reset all timers to default
pomodoro_Routes.delete('/timer', clear_Timer);

// Update the long break cycle value
pomodoro_Routes.put('/cycle', update_Cycle_Longbreak);


export default pomodoro_Routes;