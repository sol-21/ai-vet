#!/usr/bin/env node
import { Command } from 'commander';
import { auditCommand } from '../commands/audit.js';
import { scanCommand } from '../commands/scan.js';
import { explainCommand } from '../commands/explain.js';
import { initCommand } from '../commands/init.js';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.resolve(__dirname, '../../package.json');
const pkg = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
const program = new Command();
program
    .name('ai-vet')
    .description(pkg.description)
    .version(pkg.version);
program
    .command('audit [patterns...]')
    .description('Audit specific files or globs')
    .option('--json', 'Output results as JSON')
    .option('--quiet', 'Suppress info messages')
    .option('--fix', 'Auto-fix safe issues')
    .action(auditCommand);
program
    .command('scan')
    .description('Scan the whole project')
    .option('--json', 'Output results as JSON')
    .option('--quiet', 'Suppress info messages')
    .action(scanCommand);
program
    .command('explain <rule>')
    .description('Explain a specific rule')
    .action(explainCommand);
program
    .command('init')
    .description('Initialize ai-vet configuration')
    .option('--yes', 'Use default configuration')
    .action(initCommand);
program.parse();
//# sourceMappingURL=ai-vet.js.map