import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).createMotorcycle(),
);

routes.get(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).getAllMotorcycles(),
);

routes.get(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getByIdMotorcycle(),
);

routes.put(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).updateMotorcycle(),
);

export default routes;