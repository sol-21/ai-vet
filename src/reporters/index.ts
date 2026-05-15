import { ConsoleReporter } from './console-reporter.js';
import { JsonReporter } from './json-reporter.js';
import { SummaryReporter } from './summary-reporter.js';
import type { Reporter } from '../types/reporter.js';

export type ReporterType = 'console' | 'json' | 'summary';

export function getReporter(type: ReporterType): Reporter {
  switch (type) {
    case 'json': return new JsonReporter();
    case 'summary': return new SummaryReporter();
    default: return new ConsoleReporter();
  }
}
