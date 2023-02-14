import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => new CarController(req, res, next).createCar(),
);

routes.get(
  '/',
  (req, res, next) => new CarController(req, res, next).getAllCars(),
);

routes.get(
  '/:id',
  (req, res, next) => new CarController(req, res, next).getByIdCar(),
);

routes.put(
  '/:id',
  (req, res, next) => new CarController(req, res, next).updateCar(),
);

export default routes;