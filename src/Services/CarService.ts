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
    const result = await this.model.getCars();

    const cars = result.map((car) => this.createCarDomain(car));
    
    return cars;
  }

  public async getCarById(id: string) {
    const result = await this.model.getCarById(id);

    if (result.type) return result;

    const car = this.createCarDomain(result.message as ICar);

    return { type: null, message: car };
  }
}

export default CarService;