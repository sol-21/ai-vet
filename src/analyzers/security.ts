import type { Issue } from '../types/issue.js';
import { SECURITY_RULES } from '../rules/security-rules.js';

export async function analyzeSecurity(
  filePath: string,
  content: string,
  _ast: any
): Promise<Issue[]> {
  const issues: Issue[] = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const lineContent = lines[i];
    for (const rule of SECURITY_RULES) {
      if (typeof rule.pattern === 'string' ? lineContent.includes(rule.pattern) : rule.pattern.test(lineContent)) {
        issues.push({
          rule: rule.id,
          severity: rule.severity,
          message: rule.message,
          suggestion: rule.suggestion,
          location: {
            line: i + 1,
            column: 1,
          },
          file: filePath,
        });
      }
    }
  }

  return issues;
}
