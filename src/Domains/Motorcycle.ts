import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(
      motorcycle.id,
      motorcycle.model,
      motorcycle.year,
      motorcycle.color,
      motorcycle.status,
      motorcycle.buyValue,
    );
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  public get getCategory(): string {
    return this.category;
  }
  public set setCategory(value: string) {
    this.category = value;
  }

  public get getEngineCapacity(): number {
    return this.engineCapacity;
  }
  public set setEngineCapacity(value: number) {
    this.engineCapacity = value;
  }
}

export default Motorcycle;