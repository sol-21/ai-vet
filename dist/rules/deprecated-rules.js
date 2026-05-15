export const DEPRECATED_RULES = [
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
//# sourceMappingURL=deprecated-rules.js.map