import Car from '../../../../src/Domains/Car';
import ICar from '../../../../src/Interfaces/ICar';

const keyInput: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const keyOutput: Car = new Car({
  id: '644ab3590b400f1916bad8ab',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
});

const cars = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    buyValue: 39,
    doorsQty: 2,
    seatsQty: 5,
  },
];

const invalidId = { message: 'Invalid mongo id' };

const notfound = { message: 'Car not found' };

export {
  keyInput,
  keyOutput,
  cars,
  invalidId,
  notfound,
};