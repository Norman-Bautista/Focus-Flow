import {Router} from 'express';
import {sign_In , sign_Up} from './auth.controller.js'

const auth_Routes = Router();

auth_Routes.post('/sign-up' , sign_Up);
auth_Routes.post('/sign-in', sign_In);

export default auth_Routes;