export function pluralize(count: number, word: string) {
  return count === 1 ? word : `${word}s`;
}

export function centsToDollarString(cents: number) {
  return Number(cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
