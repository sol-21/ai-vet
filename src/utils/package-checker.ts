import { readFile } from 'fs/promises';
import path from 'path';

export class PackageChecker {
  private dependencies: Set<string> = new Set();

  async init(projectRoot: string = process.cwd()): Promise<void> {
    try {
      const packageJsonPath = path.join(projectRoot, 'package.json');
      const content = await readFile(packageJsonPath, 'utf-8');
      const pkg = JSON.parse(content);

      const allDeps = [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ];

      allDeps.forEach(dep => this.dependencies.add(dep));

      // Add common Node.js built-ins
      const builtins = [
        'fs', 'path', 'os', 'http', 'https', 'crypto', 'stream', 'util', 'events', 'child_process',
        'react', 'react-dom', 'lodash', 'axios'
      ];
      builtins.forEach(b => this.dependencies.add(b));
      builtins.forEach(b => this.dependencies.add(`node:${b}`));
    } catch (error) {
      // If no package.json, we'll just have an empty set (except maybe built-ins if we want)
    }
  }

  isInstalled(packageName: string): boolean {
    if (packageName.startsWith('.') || packageName.startsWith('/')) {
      return true; // Relative/absolute imports are handled elsewhere
    }
    
    // Handle scoped packages and subpaths
    const parts = packageName.split('/');
    const baseName = packageName.startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0];
    
    return this.dependencies.has(baseName);
  }
}
