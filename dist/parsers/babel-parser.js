import { parse } from '@babel/parser';
import { readFile } from 'fs/promises';
export async function parseBabel(filePath) {
    const content = await readFile(filePath, 'utf-8');
    return parse(content, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript', 'decorators-legacy'],
    });
}
//# sourceMappingURL=babel-parser.js.map