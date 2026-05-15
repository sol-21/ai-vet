import { auditCommand } from './audit.js';
export async function scanCommand(options) {
    // scan is basically audit for the whole project
    return auditCommand([], options);
}
//# sourceMappingURL=scan.js.map