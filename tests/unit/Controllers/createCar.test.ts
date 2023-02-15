import sinon from 'sinon';
import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinonChai from 'sinon-chai';
import CarController from '../../../src/Controllers/CarController';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

chai.use(sinonChai);

describe('Should register a new car', function () {
  const carInput: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  };
  const carOutput = new Car({ id: '6348513f34c397abcad040b2', ...carInput });
  const res = {} as Response;
  const next = {} as NextFunction;
  
  it('should SUCCESSFULLY register a new car', async function () {
    const req = { body: carInput } as Request;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(CarService.prototype, 'registerCar').resolves(carOutput);

    const controller = new CarController(req, res, next);
    await controller.createCar();

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(carOutput);
  });
});
