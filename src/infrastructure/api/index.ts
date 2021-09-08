import { Router } from 'express';
import usersRouter from './userRouter';

const routes = Router();

routes.use('/auth', usersRouter);

export default routes;