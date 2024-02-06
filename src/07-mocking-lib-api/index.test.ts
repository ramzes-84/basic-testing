import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  return {
    throttle: jest.fn((func) => func),
  };
});

describe('throttledGetDataFromApi', () => {
  const path = 'endpoint';
  const data = 'some text';
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create = jest.fn(() => mock);
    mock.get.mockImplementation(() => Promise.resolve({ data }));
  });

  test('should create instance with provided base url', async () => {
    expect.assertions(1);
    const spyAxiousCreate = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(path);

    expect(spyAxiousCreate).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    expect.assertions(1);
    const spyOnGet = jest.spyOn(axios.create(), 'get');

    await throttledGetDataFromApi(path);

    expect(spyOnGet).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    expect.assertions(1);

    expect(await throttledGetDataFromApi(path)).toEqual(data);
  });
});
