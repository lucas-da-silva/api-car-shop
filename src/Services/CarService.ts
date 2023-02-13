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
  
  public async register(data: ICar) {
    const newCar = await this.model.create(data);
    return this.createCarDomain(newCar);
  }
}

export default CarService;