import type { AnalyzerResult } from '../types/analyzer.js';
import type { Reporter } from '../types/reporter.js';
export declare class ConsoleReporter implements Reporter {
    report(results: AnalyzerResult[]): void;
    private getSeverityColor;
}
//# sourceMappingURL=console-reporter.d.ts.map