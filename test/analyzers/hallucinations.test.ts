import { describe, it, expect } from 'vitest';
import { analyzeHallucinations } from '../../src/analyzers/hallucinations.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Hallucinations Analyzer', () => {
  it('should detect hallucinated APIs', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/bad/hallucinations.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const issues = await analyzeHallucinations(filePath, content, null);
    
    expect(issues.some(i => i.message.includes('useAsyncEffect'))).toBe(true);
    expect(issues.some(i => i.message.includes('usePromise'))).toBe(true);
  });

  it('should return zero issues for clean fixture', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/good/clean.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const issues = await analyzeHallucinations(filePath, content, null);
    
    expect(issues.length).toBe(0);
  });
});
