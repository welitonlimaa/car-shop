import { Router } from 'express';
import CarController from '../Controllers/CarController';

const CarRoutes = Router();

CarRoutes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

CarRoutes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).getCars(),
);

CarRoutes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).getCarById(),
);

CarRoutes.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).update(),
);

export default CarRoutes;