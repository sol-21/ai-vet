import type { Issue } from '../types/issue.js';
import traverseModule from '@babel/traverse';
import type { SourceFile } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';

const traverse = (traverseModule as any).default || traverseModule;

export async function analyzeMissingAwait(
  filePath: string,
  _content: string,
  ast: any
): Promise<Issue[]> {
  const issues: Issue[] = [];

  if (ast.getType && (ast as SourceFile).getDescendantsOfKind) {
    // ts-morph
    const sourceFile = ast as SourceFile;
    const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);
    
    for (const call of callExpressions) {
      const type = call.getReturnType();
      const parent = call.getParent();
      
      const isAwaited = parent?.getKind() === SyntaxKind.AwaitExpression;
      const parentName = parent?.getKind() === SyntaxKind.PropertyAccessExpression 
        ? (parent as any).getName() 
        : '';
      const isPromiseHandled = ['then', 'catch', 'finally'].includes(parentName);
      
      const expression = call.getExpression();
      const currentName = expression.getKind() === SyntaxKind.PropertyAccessExpression
        ? (expression as any).getName()
        : '';
      const isCurrentHandled = ['then', 'catch', 'finally'].includes(currentName);

      const isPromise = type.getText().includes('Promise');

      if (isPromise && !isAwaited && !isPromiseHandled && !isCurrentHandled) {
        issues.push({
          rule: 'missing-await',
          severity: 'HIGH',
          message: `Call to async function '${call.getExpression().getText()}' is missing await.`,
          suggestion: `Add 'await' keyword before the call.`,
          location: {
            line: call.getStartLineNumber(),
            column: 1,
          },
          file: filePath,
        });
      }
    }
  } else {
    // Babel - difficult without type info, but we can look for common patterns
    traverse(ast, {
      CallExpression(_path: any) {
        // In Babel without type info, we can't easily know if a function is async
        // unless it's defined in the same file. For now, this is a placeholder.
      },
    });
  }

  return issues;
}
