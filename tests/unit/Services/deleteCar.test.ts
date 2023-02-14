import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import MessageError from '../../../src/utils/MessageError';

describe('Should delete a car by id', function () {
  const validId = '63ebc84694b27e097eb864d7'; 
  const carOutput = new Car({
    id: validId,
    model: 'Marea',
    year: 2002,
    color: 'Black',
    buyValue: 15.99,
    status: false,
    doorsQty: 4,
    seatsQty: 5,
  });
  
  it('should SUCCESSFULLY delete a car by id', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(carOutput);
    const service = new CarService();
    await service.deleteCar(validId);
  });

  it('should give ERROR when id is invalid', async function () {
    const service = new CarService();
    try {
      await service.deleteCar('invalid');
    } catch (error) {
      expect((error as Error).message).to.be.equal(MessageError.INVALID_MONGO_ID);
    }
  });

  it('should give ERROR when id not exist', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(null);

    const service = new CarService();
    try {
      await service.deleteCar('63ebc84694b27e097eb80000');
    } catch (error) {
      expect((error as Error).message).to.be.equal(MessageError.CAR_NOT_FOUND);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});