import { Router } from 'express';
import authRouter from './authRouter';
import associationRouter from './associationRouter';
import greenRepackRouter from './greenRepackRouter';
import userRouter from './userRouter';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/association', associationRouter);
routes.use('/greenrepack', greenRepackRouter);
routes.use('/user', userRouter)


export default routes;