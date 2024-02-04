import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const fakeFunction = jest.fn();

    doStuffByTimeout(fakeFunction, 10000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(fakeFunction, 10000);
  });

  test('should call callback only after timeout', () => {
    const fakeFunction = jest.fn();
    doStuffByTimeout(fakeFunction, 10000);
    expect(fakeFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(10000);

    expect(fakeFunction).toHaveBeenCalled();
    expect(fakeFunction).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const fakeFunction = jest.fn();

    doStuffByInterval(fakeFunction, 10000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(fakeFunction, 10000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const fakeFunction = jest.fn();
    doStuffByInterval(fakeFunction, 10000);

    jest.advanceTimersByTime(10000);
    expect(fakeFunction).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(10000);
    expect(fakeFunction).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const fileName = 'example.txt';

  test('should call join with pathToFile', async () => {
    expect.assertions(1);
    const mockedJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(fileName);

    expect(mockedJoin).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    expect.assertions(1);
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const fileContent = await readFileAsynchronously(fileName);

    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect.assertions(1);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('content');

    const fileContent = await readFileAsynchronously(fileName);

    expect(fileContent).toEqual('content');
  });
});
