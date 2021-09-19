import { Router } from 'express';
import usersRouter from './userRouter';
import greenRepackRouter from './greenRepackRouter'

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/team', greenRepackRouter)

export default routes;