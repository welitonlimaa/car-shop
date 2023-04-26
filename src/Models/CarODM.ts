import {
  Model,
  Schema,
  model,
  models,
  isValidObjectId,
} from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async getCars(): Promise<ICar[]> {
    const cars = await this.model.find({});

    return cars;
  }

  public async getCarById(id: string) {
    if (!isValidObjectId(id)) return { type: 422, message: { message: 'Invalid mongo id' } };

    const car = await this.model.findOne({ _id: id });
    if (!car) return { type: 404, message: { message: 'Car not found' } };

    return { type: null, message: car };
  }
}

export default CarODM;