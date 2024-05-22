export function brazilCurrencyFormatter(value: number) {
  if (!Number(value)) return '';

  const amount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100);

  return `${amount}`;
}

export function genericCurrencyFormatter(value: number) {
  if (!Number(value)) return '';

  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value / 100);

  return `${amount}`;
}
