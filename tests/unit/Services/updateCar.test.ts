import { Model } from 'mongoose';
import sinon from 'sinon';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

describe('Should update a car', function () {
  it('should SUCCESSFULLY update a car', async function () {
    const id = '63eb7a9e1a82c0ee7b99a79f';
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput = new Car({ id, ...carInput });
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const service = new CarService();
    const resolves = await service.updateCar(id, carInput);
    
    expect(resolves).to.be.deep.equal(carOutput);
  });

  it('should give ERROR when id is invalid', async function () {
    const invalidId = 'invalid';
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    try {
      const service = new CarService();
      await service.updateCar(invalidId, carInput);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});