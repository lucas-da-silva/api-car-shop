import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

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
}

export default CarService;