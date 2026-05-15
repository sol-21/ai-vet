import type { AnalyzerResult } from '../types/analyzer.js';
import type { Reporter } from '../types/reporter.js';

export class JsonReporter implements Reporter {
  report(results: AnalyzerResult[]): void {
    console.log(JSON.stringify(results, null, 2));
  }
}
