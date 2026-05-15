import path from 'path';
import { parseBabel } from './babel-parser.js';
import { parseTypeScript } from './ts-parser.js';
import { parseVue } from './vue-parser.js';
export async function parseFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.ts' || ext === '.tsx') {
        return {
            ast: await parseTypeScript(filePath),
            filePath,
            language: ext === '.ts' ? 'ts' : 'tsx',
        };
    }
    if (ext === '.vue') {
        return {
            ast: await parseVue(filePath),
            filePath,
            language: 'vue',
        };
    }
    return {
        ast: await parseBabel(filePath),
        filePath,
        language: (ext === '.jsx' ? 'jsx' : 'js'),
    };
}
//# sourceMappingURL=index.js.map