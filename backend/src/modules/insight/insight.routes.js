import {Router} from 'express';
import authorize_Middleware from '../auth/auth.middleware.js';
import { get_All_Data, get_Data, create_Data, update_Data } from './insight.controller.js';
const insight_Routes = Router();

// Apply authorization middleware
insight_Routes.use(authorize_Middleware);

// Fetch all insights for a user
insight_Routes.get('/', get_All_Data);

// Fetch specific insight (by ID or metric)
insight_Routes.get('/:id', get_Data);

// Create new insight record
insight_Routes.post('/', create_Data);

// Update an existing insight
insight_Routes.put('/:id', update_Data);

export default insight_Routes;