import {Router} from 'express';

const auth_Route = Router();

auth_Route.post('/sign-up');
auth_Route.post('sign-in');
auth_Route.post('sign-out');

export default auth_Route;