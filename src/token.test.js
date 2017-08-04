/* global describe, it, before */

const TokenContract = require('../lib/api-kleros.js');

console.log(TokenContract);

function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
