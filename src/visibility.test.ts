import { describe, expect, test } from 'vitest'
import { countVisible, NotIntegerError } from './visibility'

describe('countVisible', () => {
  test.for([
    { array: [1, 2, 3, 4, 5], expected: 5 },
    { array: [5, 4, 3, 2, 1], expected: 1 },
    { array: [2, 0, 3, 5, 1], expected: 3 },
    { array: [],              expected: 0 },
    { array: [1],             expected: 1 },
    { array: [0, 2, 3, 0],    expected: 2 },
    { array: [2, 3, 3, 4],    expected: 3 },
    { array: [3, 3, 3],       expected: 1 },
    { array: [0, 0, 0],       expected: 0 }
  ])('line $array -> $expected', ({ array, expected }) => {
    expect(countVisible(array)).toBe(expected);
  })

  test('throws RangeError for a value that exceeds the length of the array', () => {
    expect(() => countVisible([1, 2, 4])).toThrow(RangeError);
  })

  test('throws RangeError for a value < 0 in the array', () => {
    expect(() => countVisible([3, 2, -1])).toThrow(RangeError);
  })

  test('throws NotIntegerError for a decimal value in the array', () => {
    expect(() => countVisible([1, 2, 3.5, 4, 5])).toThrow(NotIntegerError);
  })
})
