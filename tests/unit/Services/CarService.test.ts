import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import { cars, invalidId, keyInput, keyOutput, notfound } from './Mocks/CarMocks';

describe('Deverá criar, listar, e atualizar carros', function () {
  it('Criando um novo carro com Sucesso', async function () {
    sinon.stub(Model, 'create').resolves(keyOutput);
    
    const service = new CarService();
    const result = await service.register(keyInput);

    expect(result).to.be.deep.equal(keyOutput);
  });

  it('Listando todos os carros', async function () {
    sinon.stub(Model, 'find').resolves(cars);

    const service = new CarService();
    const result = await service.getCars();

    expect(result).to.have.length(2);
  });

  it('Listando um carro por id', async function () {
    sinon.stub(Model, 'findOne').resolves(keyOutput);

    const service = new CarService();
    const result = await service.getCarById('644ab3590b400f1916bad8ab');

    expect(result.message).to.be.deep.equal(keyOutput);
  });

  it('Listando um carro com id invalido', async function () {
    sinon.stub(Model, 'findOne').resolves();

    const service = new CarService();
    const result = await service.getCarById('644akkkkk400f1916bad8ab');

    expect(result.message).to.be.deep.equal(invalidId);
  });

  it('Listando um carro com id inexistente', async function () {
    sinon.stub(Model, 'findOne').resolves();

    const service = new CarService();
    const result = await service.getCarById('644ab3590b400f1916bad8ab');

    expect(result.message).to.be.deep.equal(notfound);
  });

  it('Atualizando os dados de um carro com Sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(keyOutput);

    const service = new CarService();
    const result = await service.update('644ab3590b400f1916bad8ab', keyInput);

    expect(result.message).to.be.deep.equal(keyOutput);
  });

  it('Atualizando os dados de um carro com Id invalido', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(keyOutput);

    const service = new CarService();
    const result = await service.update('644akkkkk400f1916bad8ab', keyInput);

    expect(result.message).to.be.deep.equal(invalidId);
  });

  it('Atualizando os dados de um carro com Id inexistente', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves();

    const service = new CarService();
    const result = await service.update('644ab3590b400f1916bad8ab', keyInput);

    expect(result.message).to.be.deep.equal(notfound);
  });

  afterEach(function () {
    sinon.restore();
  });
});