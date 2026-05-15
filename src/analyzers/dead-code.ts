import type { Issue } from '../types/issue.js';

export async function analyzeDeadCode(
  _filePath: string,
  _content: string,
  _ast: any
): Promise<Issue[]> {
  // Placeholder for dead code analysis
  return [];
}
