import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Model } from 'mongoose';
import app from '../../src/app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Car routes should', function () {
  let chaiHttpResponse;
  
  const carInput = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    buyValue: 15.99,
    status: true,
    doorsQty: 4,
    seatsQty: 5,
  };
  const id = '63ec017112c06b864201e034';
  const carOutput = {
    id,
    ...carInput,
  };

  it('POST /cars should successfully register a new car', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);
    chaiHttpResponse = await chai.request(app).post('/cars').send(carInput);
    const { body, status } = chaiHttpResponse;
    expect(status).to.be.equal(201);
    expect(body).to.be.deep.equal(carOutput);
  });

  it('GET /cars/:id should successfully return a car', async function () {
    sinon.stub(Model, 'findById').resolves(carOutput);
    chaiHttpResponse = await chai.request(app).get(`/cars/${id}`);
    const { body, status } = chaiHttpResponse;
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(carOutput);
  });
});