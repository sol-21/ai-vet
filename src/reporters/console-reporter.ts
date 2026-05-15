import chalk from 'chalk';
import type { AnalyzerResult } from '../types/analyzer.js';
import type { Reporter } from '../types/reporter.js';

export class ConsoleReporter implements Reporter {
  report(results: AnalyzerResult[]): void {
    let totalIssues = 0;
    
    for (const result of results) {
      if (result.issues.length === 0) continue;
      
      console.log(`\n${chalk.bold.underline(`ai-vet results for ${result.file}`)}`);
      
      for (const issue of result.issues) {
        totalIssues++;
        const severityColor = this.getSeverityColor(issue.severity);
        console.log(`\n  ${severityColor(issue.severity.padEnd(8))} [${issue.rule}]  Line ${issue.location.line}`);
        console.log(`            ${issue.message}`);
        if (issue.suggestion) {
          console.log(`            ${chalk.cyan('→')} ${issue.suggestion}`);
        }
      }
    }
    
    console.log(`\n${chalk.dim('──────────────────────────────────────')}`);
    console.log(`${chalk.bold(totalIssues)} issues found.`);
  }

  private getSeverityColor(severity: string) {
    switch (severity) {
      case 'CRITICAL': return chalk.bgRed.white.bold;
      case 'HIGH': return chalk.red.bold;
      case 'MEDIUM': return chalk.yellow.bold;
      case 'LOW': return chalk.blue.bold;
      default: return chalk.dim;
    }
  }
}
