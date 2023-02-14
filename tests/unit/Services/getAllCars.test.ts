import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

describe('Should return all cars', function () {
  it('should SUCCESSFULLY return all cars', async function () {
    const carOutput = [
      new Car({
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      }),
    ];
    sinon.stub(Model, 'find').resolves(carOutput);

    const service = new CarService();
    const resolves = await service.getAllCars();

    expect(resolves).to.be.deep.equal(carOutput);
    
    sinon.restore();
  });
});
