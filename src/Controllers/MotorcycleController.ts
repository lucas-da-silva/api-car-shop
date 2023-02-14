import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
import HttpStatus from '../utils/HttpStatus';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  private createIMotorcycle(req: Request): IMotorcycle {
    return {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body.status || false,
      buyValue: req.body.buyValue,
      category: req.body.category,
      engineCapacity: req.body.engineCapacity,
    };
  }

  public async createMotorcycle() {
    const motorcycle: IMotorcycle = this.createIMotorcycle(this.req);
    const newMotorcycle = await this.service.registerMotorcycle(motorcycle);
    return this.res.status(HttpStatus.CREATED).json(newMotorcycle);
  }

  public async getAllMotorcycles() {
    const motorcycles = await this.service.getAllMotorcycles();
    return this.res.status(HttpStatus.OK).json(motorcycles);
  }

  public async getByIdMotorcycle() {
    const { id } = this.req.params;
    try {
      const motorcycles = await this.service.getByIdMotorcycle(id);
      return this.res.status(HttpStatus.OK).json(motorcycles);
    } catch (error) {
      return this.next(error);
    }
  }

  public async updateMotorcycle() {
    const { id } = this.req.params;
    const motorcycle: IMotorcycle = this.createIMotorcycle(this.req);
    try {
      const updatedMotorcycle = await this.service.updateMotorcycle(id, motorcycle);
      return this.res.status(HttpStatus.OK).json(updatedMotorcycle);
    } catch (error) {
      return this.next(error);
    }
  }

  public async deleteMotorcycle() {
    const { id } = this.req.params;
    try {
      await this.service.deleteMotorcycle(id);
      return this.res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      return this.next(error);
    }
  }
}

export default MotorcycleController;
