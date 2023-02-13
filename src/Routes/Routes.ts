import { Router } from 'express';
import CarRoutes from './CarRoutes';

const routes = Router();
routes.use('/cars', CarRoutes);

export default routes;