// @ts-nocheck
import { unused } from './other'; // Unused import

const unusedVar = 'I am never used'; // Unused variable

function unusedFunction() {
  // Never called
}

export function deadCode() {
  return true;
  console.log('unreachable'); // Unreachable code
}
