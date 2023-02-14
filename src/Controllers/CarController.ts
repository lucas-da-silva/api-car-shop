import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import HttpStatus from '../utils/HttpStatus';

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

  private createICar(req: Request): ICar {
    return {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body.status || false,
      buyValue: req.body.buyValue,
      doorsQty: req.body.doorsQty,
      seatsQty: req.body.seatsQty,
    };
  }

  public async createCar() {
    const car: ICar = this.createICar(this.req);
    const newCar = await this.service.registerCar(car);
    return this.res.status(HttpStatus.CREATED).json(newCar);
  }

  public async getAllCars() {
    const cars = await this.service.getAllCars();
    return this.res.status(HttpStatus.OK).json(cars);
  }

  public async getByIdCar() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getByIdCar(id);
      return this.res.status(HttpStatus.OK).json(car);
    } catch (error) {
      return this.next(error);
    }
  }

  public async updateCar() {
    const { id } = this.req.params;
    const car: ICar = this.createICar(this.req);
    try {
      const updatedCar = await this.service.updateCar(id, car);
      return this.res.status(HttpStatus.OK).json(updatedCar);
    } catch (error) {
      return this.next(error);
    }
  }
}

export default CarController;
