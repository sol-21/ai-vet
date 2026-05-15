export interface DeprecatedRule {
  name: string;
  replacement: string;
  message: string;
  exampleBad?: string;
  exampleGood?: string;
}

export const DEPRECATED_RULES: DeprecatedRule[] = [
  {
    name: 'url.parse',
    replacement: 'new URL()',
    message: 'url.parse is deprecated in Node.js since v11.0.0.',
    exampleBad: 'const url = require("url"); url.parse(myUrl);',
    exampleGood: 'new URL(myUrl);',
  },
  {
    name: 'new Buffer',
    replacement: 'Buffer.from()',
    message: 'new Buffer() constructor is deprecated and insecure.',
    exampleBad: 'new Buffer("hello");',
    exampleGood: 'Buffer.from("hello");',
  },
];
