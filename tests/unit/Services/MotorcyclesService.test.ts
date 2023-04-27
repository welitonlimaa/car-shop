import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motorcycles, invalidId, keyInput, keyOutput, notfound } from './Mocks/MotorcyclesMocks';

describe('Deverá criar, listar, e atualizar motos', function () {
  it('Criando um novo carro com Sucesso', async function () {
    sinon.stub(Model, 'create').resolves(keyOutput);

    const service = new MotorcycleService();
    const result = await service.register(keyInput);

    expect(result).to.be.deep.equal(keyOutput);
  });

  it('Listando todos as motos', async function () {
    sinon.stub(Model, 'find').resolves(motorcycles);

    const service = new MotorcycleService();
    const result = await service.getMotorcycles();

    expect(result).to.have.length(2);
  });

  it('Listando uma moto por id', async function () {
    sinon.stub(Model, 'findOne').resolves(keyOutput);

    const service = new MotorcycleService();
    const result = await service.getMotorcycleById('6348513f34c397abcad040b2');

    expect(result.message).to.be.deep.equal(keyOutput);
  });

  it('Listando uma moto com id invalido', async function () {
    sinon.stub(Model, 'findOne').resolves();

    const service = new MotorcycleService();
    const result = await service.getMotorcycleById('12547');

    expect(result.message).to.be.deep.equal(invalidId);
  });

  it('Listando uma moto com id inexistente', async function () {
    sinon.stub(Model, 'findOne').resolves();

    const service = new MotorcycleService();
    const result = await service.getMotorcycleById('6348513f34c397abcad040b2');

    expect(result.message).to.be.deep.equal(notfound);
  });

  it('Atualizando os dados de uma moto com Sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(keyOutput);

    const service = new MotorcycleService();
    const result = await service.update('6348513f34c397abcad040b2', keyInput);

    expect(result.message).to.be.deep.equal(keyOutput);
  });

  it('Atualizando os dados de uma moto com Id invalido', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(keyOutput);

    const service = new MotorcycleService();
    const result = await service.update('12547', keyInput);

    expect(result.message).to.be.deep.equal(invalidId);
  });

  it('Atualizando os dados de uma moto com Id inexistente', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves();

    const service = new MotorcycleService();
    const result = await service.update('6348513f34c397abcad040b2', keyInput);

    expect(result.message).to.be.deep.equal(notfound);
  });

  afterEach(function () {
    sinon.restore();
  });
});