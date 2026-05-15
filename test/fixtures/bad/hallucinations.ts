// @ts-nocheck
import { useAsyncEffect, usePromise } from 'react'; // Hallucinated hooks
import fs from 'fs';

export function hallucinatedApis() {
  const arr = [1, [2, 3]];
  arr.flatten(); // Non-existent method

  const result = fs.readFileSync('test.txt'); // Wrong args usage (result assigned but logic error)
}
