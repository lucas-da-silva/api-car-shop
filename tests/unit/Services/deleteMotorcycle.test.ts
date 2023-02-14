import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import MessageError from '../../../src/utils/MessageError';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Should delete a motorcycle by id', function () {
  const validId = '63ebca3f20238682c0d4329e';
  const motorcycleOutput = new Motorcycle({
    id: validId,
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    buyValue: 30,
    status: true,
    category: 'Street',
    engineCapacity: 600,
  });
  
  it('should SUCCESSFULLY delete a motorcycle by id', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleOutput);
    const service = new MotorcycleService();
    await service.deleteMotorcycle('63ebc84694b27e097eb864d7');
  });

  it('should give ERROR when id is invalid', async function () {
    const service = new MotorcycleService();
    try {
      await service.deleteMotorcycle('invalid');
    } catch (error) {
      expect((error as Error).message).to.be.equal(MessageError.INVALID_MONGO_ID);
    }
  });

  it('should give ERROR when id not exist', async function () {
    sinon.stub(Model, 'findByIdAndDelete').resolves(null);

    const service = new MotorcycleService();
    try {
      await service.deleteMotorcycle('63ebca3f20238682c0d40000');
    } catch (error) {
      expect((error as Error).message).to.be.equal(MessageError.MOTORCYCLE_NOT_FOUND);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});