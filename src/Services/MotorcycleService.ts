import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private model: MotorcycleODM;

  constructor() {
    this.model = new MotorcycleODM();
  }

  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async register(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.model.create(motorcycle);

    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getMotorcycles() {
    const result = await this.model.getAll();

    const Motorcycles = result.map((motorcycle: IMotorcycle) =>
      this.createMotorcycleDomain(motorcycle));

    return Motorcycles;
  }

  public async getMotorcycleById(id: string) {
    const result = await this.model.getById(id);

    if (result.type) return result;

    const motorcycle = this.createMotorcycleDomain(result.message as IMotorcycle);

    return { type: null, message: motorcycle };
  }

  public async update(id: string, motorcycle: IMotorcycle) {
    const result = await this.model.update(id, motorcycle);

    if (result.type) return result;

    const updatedMotorcycle = this.createMotorcycleDomain(result.message as IMotorcycle);

    return { type: null, message: updatedMotorcycle };
  }
}

export default MotorcycleService;