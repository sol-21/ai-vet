import { describe, it, expect } from 'vitest';
import { analyzeDeprecatedApis } from '../../src/analyzers/deprecated-apis.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Deprecated APIs Analyzer', () => {
  it('should detect deprecated API usage', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/bad/deprecated.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const issues = await analyzeDeprecatedApis(filePath, content, null);
    
    expect(issues.some(i => i.message.includes('url.parse'))).toBe(true);
    expect(issues.some(i => i.message.includes('new Buffer'))).toBe(true);
  });

  it('should return zero issues for clean fixture', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/good/clean.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const issues = await analyzeDeprecatedApis(filePath, content, null);
    
    expect(issues.length).toBe(0);
  });
});
