import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

describe('Should create a car', function () {
  it('should SUCCESSFULLY create a car', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput = new Car({ id: '6348513f34c397abcad040b2', ...carInput });
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const resolves = await service.register(carInput);
    
    expect(resolves).to.be.deep.equal(carOutput);
  });
});