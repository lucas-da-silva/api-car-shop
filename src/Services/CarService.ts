import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import CustomError from '../utils/CustomError';

class CarService {
  private carODM: CarODM;

  constructor() {
    this.carODM = new CarODM();
  }

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async register(data: ICar) {
    const newCar = await this.carODM.create(data);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const cars = await this.carODM.find();
    return cars.map((car) => this.createCarDomain(car));
  }

  public async getByIdCar(id: string) {
    const car = await this.carODM.findById(id);
    if (!car) throw new CustomError(404, 'Car not found');
    return this.createCarDomain(car);
  }
}

export default CarService;
