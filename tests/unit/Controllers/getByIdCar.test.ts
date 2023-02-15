import sinon from 'sinon';
import chai, { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinonChai from 'sinon-chai';
import CarController from '../../../src/Controllers/CarController';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

chai.use(sinonChai);

describe('Should return a car', function () {
  const res = {} as Response;
  const next = {} as NextFunction;
  const validId = '6348513f34c397abcad040b2';
  const carsOutput = new Car({
    id: '6348513f34c397abcad040b2',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  });

  it('should SUCCESSFULLY return a car by id', async function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const req = {
      params: {
        id: validId,
      },
    } as unknown as Request;

    sinon.stub(CarService.prototype, 'getByIdCar').resolves(carsOutput);

    const controller = new CarController(req, res, next);
    await controller.getByIdCar();

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(carsOutput);
  });
});
