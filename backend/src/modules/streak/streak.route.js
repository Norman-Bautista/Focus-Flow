import {Router} from 'express';
import { update_Streak_Counter, update_Cycle_Counter } from './streak.controller.js';
import authorize_Middleware from '../auth/auth.middleware.js';

const streak_Routes = Router();

streak_Routes_Routes.use(authorize_Middleware);

streak_Routes.put('/streak', update_Streak_Counter);
streak_Routes.put('/streak/cycles', update_Cycle_Counter);

export default streak_Routes;