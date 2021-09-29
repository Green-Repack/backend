import { Router } from 'express';
import authRouter from './authRouter';
import associationRouter from './associationRouter';
import greenRepackRouter from './greenRepackRouter';
import warehouseRouter from './warehouseRouter';
import userRouter from './userRouter';
import productRouter from './productRouter';
import promoRouter from './promoRouter';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/association', associationRouter);
routes.use('/product', productRouter);
routes.use('/promotion', promoRouter)
routes.use('/greenrepack', greenRepackRouter);
routes.use('/warehouse', warehouseRouter);
routes.use('/user', userRouter)
//routes.use('/webhook')

export default routes;