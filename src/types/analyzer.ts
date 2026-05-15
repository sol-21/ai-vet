import type { Issue } from './issue.js';

export interface AnalyzerResult {
  issues: Issue[];
  file: string;
  analyzedAt: Date;
}

export interface Analyzer {
  name: string;
  description: string;
  analyze(filePath: string, content: string, ast: unknown): Promise<Issue[]>;
}
