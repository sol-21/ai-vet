import { analyzePhantomImports } from './phantom-imports.js';
import { analyzeMissingAwait } from './missing-await.js';
import { analyzeSecurity } from './security.js';
import { analyzeErrorHandling } from './error-handling.js';
import { analyzeDeprecatedApis } from './deprecated-apis.js';
import { analyzeHallucinations } from './hallucinations.js';
import { analyzeDeadCode } from './dead-code.js';
import { analyzeTypeMismatches } from './type-mismatches.js';
export async function runAllAnalyzers(filePath, content, ast) {
    const allIssues = [];
    const analyzers = [
        analyzePhantomImports,
        analyzeMissingAwait,
        analyzeSecurity,
        analyzeErrorHandling,
        analyzeDeprecatedApis,
        analyzeHallucinations,
        analyzeDeadCode,
        analyzeTypeMismatches,
    ];
    for (const analyze of analyzers) {
        try {
            const issues = await analyze(filePath, content, ast);
            allIssues.push(...issues);
        }
        catch (error) {
            console.error(`Error in analyzer: ${error}`);
        }
    }
    return allIssues;
}
//# sourceMappingURL=index.js.map