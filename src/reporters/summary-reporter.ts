import chalk from 'chalk';
import type { AnalyzerResult } from '../types/analyzer.js';
import type { Reporter } from '../types/reporter.js';

export class SummaryReporter implements Reporter {
  report(results: AnalyzerResult[]): void {
    for (const result of results) {
      const issueCount = result.issues.length;
      if (issueCount > 0) {
        console.log(`${chalk.red('✖')} ${result.file}: ${issueCount} issues found.`);
      } else {
        console.log(`${chalk.green('✔')} ${result.file}: clean.`);
      }
    }
  }
}
