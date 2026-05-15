import type { Issue } from '../types/issue.js';
import { DEPRECATED_RULES } from '../rules/deprecated-rules.js';

export async function analyzeDeprecatedApis(
  filePath: string,
  content: string,
  _ast: any
): Promise<Issue[]> {
  const issues: Issue[] = [];
  const lines = content.split('\n');
  for (const rule of DEPRECATED_RULES) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(rule.name)) {
        issues.push({
          rule: 'deprecated-apis',
          severity: 'MEDIUM',
          message: rule.message,
          suggestion: `Use ${rule.replacement} instead.`,
          location: { line: i + 1, column: 1 },
          file: filePath,
        });
      }
    }
  }
  return issues;
}
