import { HALLUCINATION_RULES } from '../rules/hallucination-rules.js';
export async function analyzeHallucinations(filePath, content, _ast) {
    const issues = [];
    const lines = content.split('\n');
    for (const rule of HALLUCINATION_RULES) {
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(rule.name)) {
                issues.push({
                    rule: 'hallucinations',
                    severity: 'HIGH',
                    message: rule.message,
                    suggestion: rule.suggestion,
                    location: { line: i + 1, column: 1 },
                    file: filePath,
                });
            }
        }
    }
    return issues;
}
//# sourceMappingURL=hallucinations.js.map