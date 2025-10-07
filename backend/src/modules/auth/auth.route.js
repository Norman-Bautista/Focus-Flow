import {Router} from 'express';
import {sign_In , sign_Up} from './auth.controller.js'

const auth_Route = Router();

auth_Route.post('/sign-up' , sign_Up);
auth_Route.post('/sign-in', sign_In);

export default auth_Route;