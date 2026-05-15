import { findFiles } from '../utils/file-finder.js';
import { loadConfig } from '../utils/config-loader.js';
import { parseFile } from '../parsers/index.js';
import { runAllAnalyzers } from '../analyzers/index.js';
import { getReporter } from '../reporters/index.js';
import { logger } from '../utils/logger.js';
import { readFile } from 'fs/promises';
export async function auditCommand(patterns, options) {
    const config = await loadConfig();
    const reporter = getReporter(options.json ? 'json' : (options.quiet ? 'summary' : 'console'));
    const files = await findFiles(patterns.length > 0 ? patterns : config.include, config.exclude);
    const results = [];
    logger.info(`Auditing ${files.length} files...`);
    for (const file of files) {
        try {
            const content = await readFile(file, 'utf-8');
            const { ast } = await parseFile(file);
            const issues = await runAllAnalyzers(file, content, ast);
            results.push({
                file,
                issues,
                analyzedAt: new Date(),
            });
        }
        catch (error) {
            logger.error(`Failed to audit ${file}: ${error.message}`);
        }
    }
    reporter.report(results);
    const hasHighSeverityIssues = results.some(r => r.issues.some(i => i.severity === 'CRITICAL' || i.severity === 'HIGH'));
    if (hasHighSeverityIssues) {
        process.exit(1);
    }
}
//# sourceMappingURL=audit.js.map