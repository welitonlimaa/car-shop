import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const MotorcycleRoutes = Router();

MotorcycleRoutes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

MotorcycleRoutes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).getMotorcycle(),
);

MotorcycleRoutes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getMotorcycleById(),
);

MotorcycleRoutes.put(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).update(),
);

export default MotorcycleRoutes;