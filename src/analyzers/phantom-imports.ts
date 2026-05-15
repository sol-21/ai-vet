import type { Issue } from '../types/issue.js';
import { PackageChecker } from '../utils/package-checker.js';
import traverseModule from '@babel/traverse';
import type { SourceFile } from 'ts-morph';

const traverse = (traverseModule as any).default || traverseModule;

export async function analyzePhantomImports(
  filePath: string,
  _content: string,
  ast: any
): Promise<Issue[]> {
  const issues: Issue[] = [];
  const checker = new PackageChecker();
  await checker.init();

  if (ast.getType && (ast as SourceFile).getImportDeclarations) {
    // ts-morph
    const sourceFile = ast as SourceFile;
    const imports = sourceFile.getImportDeclarations();
    for (const imp of imports) {
      const moduleSpecifier = imp.getModuleSpecifierValue();
      if (!checker.isInstalled(moduleSpecifier)) {
        issues.push({
          rule: 'phantom-imports',
          severity: 'HIGH',
          message: `Imported package '${moduleSpecifier}' is not installed.`,
          suggestion: `Run 'npm install ${moduleSpecifier}'`,
          location: {
            line: imp.getStartLineNumber(),
            column: 1, // Simplified
          },
          file: filePath,
        });
      }
    }
  } else {
    // Babel
    traverse(ast, {
      ImportDeclaration(path: any) {
        const source = path.node.source.value;
        if (!checker.isInstalled(source)) {
          issues.push({
            rule: 'phantom-imports',
            severity: 'HIGH',
            message: `Imported package '${source}' is not installed.`,
            suggestion: `Run 'npm install ${source}'`,
            location: {
              line: path.node.loc.start.line,
              column: path.node.loc.start.column,
            },
            file: filePath,
          });
        }
      },
    });
  }

  return issues;
}
