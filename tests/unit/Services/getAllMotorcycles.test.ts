import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Should return all motorcycles', function () {
  it('should SUCCESSFULLY return all motorcycles', async function () {
    const motorcycleOutput = [
      new Motorcycle({
        id: '6348513f34c397abcad040b2',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      }),
    ];
    sinon.stub(Model, 'find').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const resolves = await service.getAllMotorcycles();

    expect(resolves).to.be.deep.equal(motorcycleOutput);
  
    sinon.restore();
  });
});
