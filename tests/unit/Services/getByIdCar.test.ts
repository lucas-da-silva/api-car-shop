import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import MessageError from '../../../src/utils/MessageError';

describe('Should return the car by id', function () {
  it('should SUCCESSFULLY return the car by id', async function () {
    const validId = '6348513f34c397abcad040b2';  
    const carOutput = new Car({
      id: validId,
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService();
    const resolves = await service.getByIdCar(validId);

    expect(resolves).to.be.deep.equal(carOutput);
  });

  it('should give ERROR when id is invalid', async function () {
    const invalidId = 'invalid';  

    const service = new CarService();
    try {
      await service.getByIdCar(invalidId);
    } catch (error) {
      expect((error as Error).message).to.be.equal(MessageError.INVALID_MONGO_ID);
    }
  });

  it('should give ERROR when id does not exist', async function () {
    const notExistId = '6348513f34c397abcad00000';  
    sinon.stub(Model, 'findById').resolves(null);

    const service = new CarService();
    try {
      await service.getByIdCar(notExistId);
    } catch (error) {
      expect((error as Error).message).to.be.equal(MessageError.CAR_NOT_FOUND);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});
