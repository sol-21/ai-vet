import { ConsoleReporter } from './console-reporter.js';
import { JsonReporter } from './json-reporter.js';
import { SummaryReporter } from './summary-reporter.js';
export function getReporter(type) {
    switch (type) {
        case 'json': return new JsonReporter();
        case 'summary': return new SummaryReporter();
        default: return new ConsoleReporter();
    }
}
//# sourceMappingURL=index.js.map