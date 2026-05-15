export type RuleSetting = 'error' | 'warn' | 'info' | 'off';
export interface AiAuditConfig {
    include: string[];
    exclude: string[];
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
    rules: Record<string, RuleSetting>;
    customRules: string[];
    fix: boolean;
    ignore: string[];
    gitDiff: boolean;
}
//# sourceMappingURL=config.d.ts.map