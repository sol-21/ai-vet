import type { Issue } from '../types/issue.js';

export async function analyzeErrorHandling(
  filePath: string,
  content: string,
  _ast: any
): Promise<Issue[]> {
  const issues: Issue[] = [];
  // Strip comments for analysis
  const cleanContent = content.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
  
  // Simple check for fetch without try/catch or .ok check
  const hasTryCatch = cleanContent.includes('try {') || cleanContent.includes('.catch(');
  const hasOkCheck = cleanContent.includes('.ok');
  
  if (cleanContent.includes('fetch(') && !hasTryCatch && !hasOkCheck) {
    const lines = content.split('\n');
    const lineIndex = lines.findIndex(l => l.includes('fetch('));
    issues.push({
      rule: 'error-handling',
      severity: 'MEDIUM',
      message: 'fetch() call found without apparent error handling.',
      suggestion: 'Wrap in try/catch or add a .catch() block.',
      location: { line: lineIndex + 1, column: 1 },
      file: filePath,
    });
  }
  return issues;
}
