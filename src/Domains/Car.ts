import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    super(car.id, car.model, car.year, car.color, car.status, car.buyValue);
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  public get getDoorsQty(): number {
    return this.doorsQty;
  }
  public set setDoorsQty(value: number) {
    this.doorsQty = value;
  }

  public get getSeatsQty(): number {
    return this.seatsQty;
  }
  public set setSeatsQty(value: number) {
    this.seatsQty = value;
  }
}

export default Car;