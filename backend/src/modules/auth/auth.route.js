import {Router} from 'express';
import {sign_In , sign_Up, refresh_Token} from './auth.controller.js'

const auth_Routes = Router();

auth_Routes.post('/sign-up' , sign_Up);
auth_Routes.post('/sign-in', sign_In);
auth_Routes.get("/refresh", refresh_Token);

export default auth_Routes;