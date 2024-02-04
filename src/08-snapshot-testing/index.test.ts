import { generateLinkedList } from './index';

const arr = [1, 2, 3];
const readyList = {
  value: 1,
  next: { value: 2, next: { value: 3, next: { value: null, next: null } } },
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(arr);
    expect(linkedList).toStrictEqual(readyList);
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(arr);
    expect(linkedList).toMatchSnapshot();
  });
});
