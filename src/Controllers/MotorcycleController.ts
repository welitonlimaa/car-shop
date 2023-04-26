import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const { body } = this.req;

    const motorcycle: IMotorcycle = { ...body };

    try {
      const newMotorcycle = await this.service.register(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycle() {
    try {
      const cars = await this.service.getMotorcycles();
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycleById() {
    const { id } = this.req.params;

    try {
      const { type, message } = await this.service.getMotorcycleById(id);

      if (type) return this.res.status(type).json(message);

      return this.res.status(200).json(message);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { body } = this.req;

    const motorcycle: IMotorcycle = { ...body };

    const { id } = this.req.params;

    try {
      const { type, message } = await this.service.update(id, motorcycle);

      if (type) return this.res.status(type).json(message);

      return this.res.status(200).json(message);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;