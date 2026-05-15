import { describe, it, expect } from 'vitest';
import { analyzeMissingAwait } from '../../src/analyzers/missing-await.js';
import { parseFile } from '../../src/parsers/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Missing Await Analyzer', () => {
  it('should detect missing await issues', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/bad/missing-await.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    const { ast } = await parseFile(filePath);
    
    const issues = await analyzeMissingAwait(filePath, content, ast);
    
    expect(issues.some(i => i.rule === 'missing-await')).toBe(true);
  }, 15000);

  it('should return zero issues for clean fixture', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/good/clean.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    const { ast } = await parseFile(filePath);
    
    const issues = await analyzeMissingAwait(filePath, content, ast);
    
    expect(issues.length).toBe(0);
  }, 15000);
});
