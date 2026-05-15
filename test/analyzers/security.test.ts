import { describe, it, expect } from 'vitest';
import { analyzeSecurity } from '../../src/analyzers/security.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Security Analyzer', () => {
  it('should detect security vulnerabilities', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/bad/insecure.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const issues = await analyzeSecurity(filePath, content, null);
    
    expect(issues.some(i => i.rule === 'security/eval' && i.severity === 'CRITICAL')).toBe(true);
    expect(issues.some(i => i.rule === 'security/hardcoded-secret' && i.severity === 'CRITICAL')).toBe(true);
    expect(issues.some(i => i.rule === 'security/inner-html' && i.severity === 'HIGH')).toBe(true);
  });

  it('should return zero issues for clean fixture', async () => {
    const filePath = path.resolve(__dirname, '../fixtures/good/clean.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const issues = await analyzeSecurity(filePath, content, null);
    
    expect(issues.length).toBe(0);
  });
});
