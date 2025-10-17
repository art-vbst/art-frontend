export function pluralize(count: number, word: string) {
  return count === 1 ? word : `${word}s`;
}

export function centsToDollarString(cents: number) {
  return Number(cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export const formatInches = (inches: number) => {
  if (inches < 9 && inches > 8.5) return 8.5;
  return Math.floor(inches);
};

export function checkExhaustiveness(_val: never): never {
  throw new Error('not exhaustive');
}
