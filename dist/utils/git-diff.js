import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
const execAsync = promisify(exec);
export async function getGitDiffFiles() {
    try {
        const { stdout } = await execAsync('git diff --name-only HEAD');
        return stdout
            .split('\n')
            .filter(Boolean)
            .map(file => path.resolve(process.cwd(), file));
    }
    catch (error) {
        return [];
    }
}
//# sourceMappingURL=git-diff.js.map