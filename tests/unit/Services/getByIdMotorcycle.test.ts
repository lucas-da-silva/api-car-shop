import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import MessageError from '../../../src/utils/MessageError';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Should return the motorcycle by id', function () {
  it('should SUCCESSFULLY return the motorcycle by id', async function () {
    const validId = '6348513f34c397abcad040b2';  
    const motorcycleOutput = new Motorcycle({
      id: validId,
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });
    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const resolves = await service.getByIdMotorcycle(validId);

    expect(resolves).to.be.deep.equal(motorcycleOutput);
  });

  it('should give ERROR when id is invalid', async function () {
    const invalidId = 'invalid';  

    const service = new MotorcycleService();
    try {
      await service.getByIdMotorcycle(invalidId);
    } catch (error) {
      expect((error as Error).message).to.be.equal(MessageError.INVALID_MONGO_ID);
    }
  });

  it('should give ERROR when id does not exist', async function () {
    const notExistId = '6348513f34c397abcad00000';  
    sinon.stub(Model, 'findById').resolves(null);

    const service = new MotorcycleService();
    try {
      await service.getByIdMotorcycle(notExistId);
    } catch (error) {
      expect((error as Error).message).to.be.equal(MessageError.MOTORCYCLE_NOT_FOUND);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});
