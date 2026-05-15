import { cosmiconfig } from 'cosmiconfig';
const MODULE_NAME = 'aivet';
const DEFAULT_CONFIG = {
    include: ['src/**/*.{js,ts,jsx,tsx}'],
    exclude: ['**/*.test.ts', 'node_modules', 'dist'],
    severity: 'HIGH',
    rules: {
        'phantom-imports': 'error',
        'missing-await': 'error',
        'error-handling': 'warn',
        'security': 'error',
        'deprecated-apis': 'warn',
        'dead-code': 'info',
        'type-mismatches': 'warn',
        'hallucinations': 'error',
    },
    customRules: [],
    fix: false,
    ignore: [],
    gitDiff: false,
};
export async function loadConfig() {
    const explorer = cosmiconfig(MODULE_NAME);
    const result = await explorer.search();
    if (!result || result.isEmpty) {
        return DEFAULT_CONFIG;
    }
    return {
        ...DEFAULT_CONFIG,
        ...result.config,
        rules: {
            ...DEFAULT_CONFIG.rules,
            ...(result.config.rules || {}),
        },
    };
}
//# sourceMappingURL=config-loader.js.map