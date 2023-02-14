import { Router } from 'express';
import MotorcycleService from '../Controllers/MotorcycleService';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => new MotorcycleService(req, res, next).create(),
);

export default routes;