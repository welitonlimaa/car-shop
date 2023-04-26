import express from 'express';
import CarRoutes from './Routes/CarRouter';
import ErrorHandler from './Middlewares/ErrorHandler';

const app = express();

app.use(express.json());

app.use(CarRoutes);

app.use(ErrorHandler.handle);

export default app;
