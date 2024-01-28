import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test value';

    const returnedValue = await resolveValue(value);

    expect(returnedValue).toEqual(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'Test err msg';

    expect(() => {
      throwError(msg);
    }).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError();
    }).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(2);
    await rejectCustomError().catch((error) => {
      expect(error).toBeInstanceOf(MyAwesomeError);
      expect(error.message).toEqual('This is my awesome custom error!');
    });
  });
});
