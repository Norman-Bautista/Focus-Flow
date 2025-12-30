import {Router} from 'express';
import {
  get_All_Tasks,
  get_Task,
  create_Task,
  update_Task,
  complete_Task,
  delete_Task,
} from './task.controller.js'
import authorize_Middleware from '../auth/auth.middleware.js';

const task_Routes = Router();

task_Routes.use(authorize_Middleware);

task_Routes.get('/tasks' ,get_All_Tasks);
task_Routes.get('/tasks/:id', get_Task);
task_Routes.post('/tasks', create_Task );
task_Routes.put('/tasks/:id', update_Task);
task_Routes.put('/tasks/:id/complete', complete_Task);
task_Routes.delete('/tasks/:id', delete_Task);

export default task_Routes;