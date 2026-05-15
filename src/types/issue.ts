export type IssueSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface IssueLocation {
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
}

export interface Issue {
  rule: string;
  severity: IssueSeverity;
  message: string;
  suggestion: string;
  location: IssueLocation;
  file: string;
}
