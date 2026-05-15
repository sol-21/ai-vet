import type { IssueSeverity } from '../types/issue.js';
export interface SecurityRule {
    id: string;
    pattern: string | RegExp;
    message: string;
    severity: IssueSeverity;
    suggestion: string;
    exampleBad?: string;
    exampleGood?: string;
}
export declare const SECURITY_RULES: SecurityRule[];
//# sourceMappingURL=security-rules.d.ts.map