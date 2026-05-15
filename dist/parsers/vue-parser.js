import { readFile } from 'fs/promises';
import { parse } from '@babel/parser';
export async function parseVue(filePath) {
    const content = await readFile(filePath, 'utf-8');
    const scriptMatch = content.match(/<script.*?>([\s\S]*?)<\/script>/);
    if (!scriptMatch) {
        return null;
    }
    const scriptContent = scriptMatch[1];
    return parse(scriptContent, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript', 'decorators-legacy'],
    });
}
//# sourceMappingURL=vue-parser.js.map