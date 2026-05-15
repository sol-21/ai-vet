import { glob } from 'glob';
import path from 'path';
export async function findFiles(patterns, exclude = []) {
    const files = await glob(patterns, {
        ignore: ['**/node_modules/**', '**/dist/**', ...exclude],
        nodir: true,
        absolute: true,
    });
    return files.map(file => path.normalize(file));
}
//# sourceMappingURL=file-finder.js.map