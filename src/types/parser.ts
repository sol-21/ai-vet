export interface ParseResult {
  ast: unknown;
  filePath: string;
  language: 'js' | 'ts' | 'jsx' | 'tsx' | 'vue';
}
