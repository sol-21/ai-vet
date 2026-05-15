export const SECURITY_RULES = [
    {
        id: 'security/eval',
        pattern: /\beval\s*\(/,
        message: 'eval() is extremely dangerous and can lead to XSS or remote code execution.',
        severity: 'CRITICAL',
        suggestion: 'Use safer alternatives like JSON.parse() or direct property access.',
        exampleBad: 'eval("const x = 10");',
        exampleGood: 'JSON.parse("{\\"x\\": 10}");',
    },
    {
        id: 'security/inner-html',
        pattern: /\.innerHTML\s*=/,
        message: 'Directly setting innerHTML can lead to XSS vulnerabilities.',
        severity: 'HIGH',
        suggestion: 'Use textContent, innerText, or a DOM sanitizer library.',
        exampleBad: 'element.innerHTML = "<div>" + userInput + "</div>";',
        exampleGood: 'element.textContent = userInput;',
    },
    {
        id: 'security/hardcoded-secret',
        pattern: /sk_(?:live|test)_[a-zA-Z0-9]{24,}|AIza[0-9A-Za-z-_]{35}/,
        message: 'Detected potentially hardcoded API key or secret.',
        severity: 'CRITICAL',
        suggestion: 'Move secrets to environment variables or a secure vault.',
        exampleBad: 'const apiKey = "sk_live_" + "123456789012345678901234";',
        exampleGood: 'const apiKey = process.env.API_KEY;',
    },
];
//# sourceMappingURL=security-rules.js.map