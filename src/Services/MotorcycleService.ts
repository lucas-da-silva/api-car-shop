import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
// import CustomError from '../utils/CustomError';

class MotorcycleService {
  private motorcycleODM: MotorcycleODM;

  constructor() {
    this.motorcycleODM = new MotorcycleODM();
  }

  private createMotorcycleDomain(car: IMotorcycle): Motorcycle {
    return new Motorcycle(car);
  }

  public async registerMotorcycle(data: IMotorcycle) {
    const newMotorcycle = await this.motorcycleODM.create(data);
    return this.createMotorcycleDomain(newMotorcycle);
  }
}

export default MotorcycleService;
