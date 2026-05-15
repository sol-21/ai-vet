import { describe, it, expect } from 'vitest';
import { analyzeErrorHandling } from '../../src/analyzers/error-handling.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Error Handling Analyzer', () => {
  it('should detect error handling issues', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/bad/error-handling.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const issues = await analyzeErrorHandling(filePath, content, null);
    
    expect(issues.length).toBeGreaterThan(0);
  });

  it('should return zero issues for clean fixture', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/good/clean.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const issues = await analyzeErrorHandling(filePath, content, null);
    
    expect(issues.length).toBe(0);
  });
});
