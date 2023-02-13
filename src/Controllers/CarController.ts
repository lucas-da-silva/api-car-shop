import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    const newCar = await this.service.register(car);
    return this.res.status(201).json(newCar);
  }

  public async getAllCars() {
    const cars = await this.service.getAllCars();
    return this.res.status(200).json(cars);
  }

  public async getByIdCar() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getByIdCar(id);
      return this.res.status(200).json(car);
    } catch (error) {
      return this.next(error);
    }
  }
}

export default CarController;
