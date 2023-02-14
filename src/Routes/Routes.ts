import { Router } from 'express';
import CarRoutes from './CarRoutes';
import MotorcycleRoutes from './MotorcycleRoutes';

const routes = Router();
routes.use('/cars', CarRoutes);
routes.use('/motorcycles', MotorcycleRoutes);

export default routes;