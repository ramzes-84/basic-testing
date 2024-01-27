import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const addResult = simpleCalculator({
      a: 17,
      b: 6,
      action: Action.Add,
    });
    expect(addResult).toEqual(23);
  });

  test('should subtract two numbers', () => {
    const substractResult = simpleCalculator({
      a: 17,
      b: 6,
      action: Action.Subtract,
    });
    expect(substractResult).toEqual(11);
  });

  test('should multiply two numbers', () => {
    const multResult = simpleCalculator({
      a: 17,
      b: 10,
      action: Action.Multiply,
    });
    expect(multResult).toEqual(170);
  });

  test('should divide two numbers', () => {
    const divideResult = simpleCalculator({
      a: 17,
      b: 10,
      action: Action.Divide,
    });
    expect(divideResult).toEqual(1.7);
  });

  test('should exponentiate two numbers', () => {
    const expResult = simpleCalculator({
      a: 5,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(expResult).toEqual(125);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 5,
      b: 3,
      action: 'create',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '5',
      b: 3,
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
