import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const { body } = this.req;

    const car: ICar = { ...body };

    try {
      const newCar = await this.service.register(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getCars() {
    try {
      const cars = await this.service.getCars();
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getCarById() {
    const { id } = this.req.params;

    try {
      const { type, message } = await this.service.getCarById(id);

      if (type) return this.res.status(type).json(message);

      return this.res.status(200).json(message);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { body } = this.req;

    const car: ICar = { ...body };

    const { id } = this.req.params;

    try {
      const { type, message } = await this.service.update(id, car);

      if (type) return this.res.status(type).json(message);

      return this.res.status(200).json(message);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;