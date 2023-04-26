import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private model: CarODM;

  constructor() {
    this.model = new CarODM();
  }

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async register(car: ICar) {
    const newCar = await this.model.create(car);

    return this.createCarDomain(newCar);
  }

  public async getCars() {
    const result = await this.model.getAll();

    const cars = result.map((car) => this.createCarDomain(car));

    return cars;
  }

  public async getCarById(id: string) {
    const result = await this.model.getById(id);

    if (result.type) return result;

    const car = this.createCarDomain(result.message as ICar);

    return { type: null, message: car };
  }

  public async update(id: string, car: ICar) {
    const result = await this.model.update(id, car);
    
    if (result.type) return result;

    const updatedCar = this.createCarDomain(result.message as ICar);

    return { type: null, message: updatedCar };
  }
}

export default CarService;