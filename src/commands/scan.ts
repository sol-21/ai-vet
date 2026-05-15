import { auditCommand } from './audit.js';

export async function scanCommand(options: any) {
  // scan is basically audit for the whole project
  return auditCommand([], options);
}
