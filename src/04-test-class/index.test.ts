import lodash from 'lodash';
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

let account: BankAccount;
const balance = 100;

beforeEach(() => {
  account = getBankAccount(balance);
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      account.withdraw(balance + 1);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const toAccount = getBankAccount(0);
    expect(() => {
      account.transfer(balance + 1, toAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(balance, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositSum = 10;

    account.deposit(depositSum);

    expect(account.getBalance()).toEqual(balance + depositSum);
  });

  test('should withdraw money', () => {
    const withdrawSum = 10;

    account.withdraw(withdrawSum);

    expect(account.getBalance()).toEqual(balance - withdrawSum);
  });

  test('should transfer money', () => {
    const toAccount = getBankAccount(0);
    const recipientStartBalance = toAccount.getBalance();
    const donorStartBalance = account.getBalance();
    const transferSum = 1;

    account.transfer(transferSum, toAccount);

    expect(toAccount.getBalance()).toEqual(recipientStartBalance + transferSum);
    expect(account.getBalance()).toEqual(donorStartBalance - transferSum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 50;
    const mockedRandom = jest.spyOn(lodash, 'random');
    mockedRandom.mockReturnValueOnce(balance).mockReturnValueOnce(1);

    const fetchedBalance = await account.fetchBalance();

    expect(fetchedBalance).toBe(balance);
    expect(typeof fetchedBalance).toBe('number');
    expect(fetchedBalance).toEqual(balance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    expect.assertions(1);
    const balanceToFetch = 50;
    const mockedFetchBalance = jest.spyOn(account, 'fetchBalance');
    mockedFetchBalance.mockResolvedValueOnce(balanceToFetch);

    await account.synchronizeBalance();

    expect(account.getBalance()).toEqual(balanceToFetch);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(1);
    const mockedFetchBalance = jest.spyOn(account, 'fetchBalance');
    mockedFetchBalance.mockResolvedValueOnce(null);

    await account.synchronizeBalance().catch((err) => {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    });
  });
});
