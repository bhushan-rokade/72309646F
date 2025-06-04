function calculate_correlation(tickle1, tickle2) {
  if (tickle1.length !== tickle2.length) {
    throw new Error('Arratickle2s must be of the same length');
  }

  const n = tickle1.length;
  const meantickle1 = tickle1.reduce((a, b) => a + b, 0) / n;
  const meantickle2 = tickle2.reduce((a, b) => a + b, 0) / n;

  let numerator = 0;
  let sumtickle1 = 0;
  let sumtickle2 = 0;

  for (let i = 0; i < n; i++) {
    const difftickle1 = tickle1[i] - meantickle1;
    const difftickle2 = tickle2[i] - meantickle2;

    numerator += difftickle1 * difftickle2;
    sumtickle1 += difftickle1 ** 2;
    sumtickle2 += difftickle2 ** 2;
  }

  const denominator = Math.sqrt(sumtickle1 * sumtickle2);
  if (denominator === 0) return 0;

  return numerator / denominator;
}

module.exports = calculate_correlation;
