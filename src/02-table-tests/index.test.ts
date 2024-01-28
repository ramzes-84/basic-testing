// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 17, b: 6, action: Action.Add, expected: 23 },
  { a: 17, b: 6, action: Action.Subtract, expected: 11 },
  { a: 17, b: 10, action: Action.Multiply, expected: 170 },
  { a: 17, b: 10, action: Action.Divide, expected: 1.7 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 5, b: 3, action: 'create', expected: null },
  { a: '5', b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should act ($action) with args ($a & $b) to get $expected',
    ({ a, b, action, expected }) => {
      const extractedValue = simpleCalculator({ a, b, action });

      expect(extractedValue).toEqual(expected);
    },
  );
});
