import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

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

  public async create() {
    const motorcycle: IMotorcycle = this.createIMotorcycle(this.req);
    const newMotorcycle = await this.service.register(motorcycle);
    return this.res.status(201).json(newMotorcycle);
  }
}

export default MotorcycleController;
