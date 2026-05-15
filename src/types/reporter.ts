import type { AnalyzerResult } from './analyzer.js';

export interface Reporter {
  report(results: AnalyzerResult[]): void;
}
