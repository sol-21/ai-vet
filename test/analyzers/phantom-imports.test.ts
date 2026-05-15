import { describe, it, expect } from 'vitest';
import { analyzePhantomImports } from '../../src/analyzers/phantom-imports.js';
import { parseFile } from '../../src/parsers/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Phantom Imports Analyzer', () => {
  it('should detect phantom imports in bad fixture', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/bad/all-issues.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    const { ast } = await parseFile(filePath);
    
    const issues = await analyzePhantomImports(filePath, content, ast);
    
    expect(issues.some(i => i.rule.includes('phantom-imports'))).toBe(true);
  });

  it('should return zero issues for clean fixture', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/good/clean.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    const { ast } = await parseFile(filePath);
    
    const issues = await analyzePhantomImports(filePath, content, ast);
    
    expect(issues.length).toBe(0);
  });
});
