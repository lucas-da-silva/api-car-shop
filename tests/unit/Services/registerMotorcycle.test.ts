import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Should create a motorcycle', function () {
  it('should SUCCESSFULLY create a motorcycle', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 600,
    };
    const motorcycleOutput = new Motorcycle({ 
      id: '6348513f34c397abcad040b2', 
      ...motorcycleInput, 
    });
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const resolves = await service.registerMotorcycle(motorcycleInput);
    
    expect(resolves).to.be.deep.equal(motorcycleOutput);

    sinon.restore();
  });
});