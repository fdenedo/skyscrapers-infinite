export function countVisible(line: readonly number[]): number {
  let seen = 0;
  let highest = 0;

  for (const height of line) {
    if (height < 0 || height > line.length) throw new RangeError(`value ${height} is out of range`);
    if (!Number.isInteger(height)) throw new NotIntegerError(height);
    if (height > highest) {
      seen++;
      highest = height;
    }
  }

  return seen;
}


export class NotIntegerError extends Error {
  constructor(value: number) {
    super(`value ${value} is not an integer`);
    this.name = 'NotIntegerError';
  }
}
