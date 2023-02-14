import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import CustomError from '../utils/CustomError';
import HttpStatus from '../utils/HttpStatus';
import MessageError from '../utils/MessageError';

class MotorcycleService {
  private motorcycleODM: MotorcycleODM;

  constructor() {
    this.motorcycleODM = new MotorcycleODM();
  }

  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }

  public async registerMotorcycle(data: IMotorcycle) {
    const newMotorcycle = await this.motorcycleODM.create(data);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAllMotorcycles() {
    const motorcycles = await this.motorcycleODM.find();
    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async getByIdMotorcycle(id: string) {
    const motorcycle = await this.motorcycleODM.findById(id);
    if (!motorcycle) { 
      throw new CustomError(HttpStatus.NOT_FOUND, MessageError.MOTORCYCLE_NOT_FOUND);
    }
    return this.createMotorcycleDomain(motorcycle);
  }
}

export default MotorcycleService;
