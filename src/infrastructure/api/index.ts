import { Router } from 'express';
import usersRouter from '../../../infrastructure/api/userRouter';

const routes = Router();

routes.use('/auth', usersRouter);

export default routes;