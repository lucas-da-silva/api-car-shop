import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import MessageError from '../../../src/utils/MessageError';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Should update a motorcycle', function () {
  const motorcycleInput: IMotorcycle = {
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };
  
  it('should SUCCESSFULLY update a motorcycle', async function () {
    const id = '6348513f34c397abcad040b2';  
    const motorcycleOutput = new Motorcycle({ id, ...motorcycleInput });
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const resolves = await service.updateMotorcycle(id, motorcycleInput);
    
    expect(resolves).to.be.deep.equal(motorcycleOutput);
  });

  it('should give ERROR when id is invalid', async function () {
    const invalidId = 'invalid';  

    const service = new MotorcycleService();
    try {
      await service.updateMotorcycle(invalidId, motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal(MessageError.INVALID_MONGO_ID);
    }
  });

  it('should give ERROR when id not exist', async function () {
    const notExistId = '6348513f34c397abcad00000';
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const service = new MotorcycleService();
    try {
      await service.updateMotorcycle(notExistId, motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal(MessageError.MOTORCYCLE_NOT_FOUND);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});