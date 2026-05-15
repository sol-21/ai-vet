import { logger } from '../utils/logger.js';
import { SECURITY_RULES } from '../rules/security-rules.js';
import { DEPRECATED_RULES } from '../rules/deprecated-rules.js';
import { HALLUCINATION_RULES } from '../rules/hallucination-rules.js';

export async function explainCommand(ruleName: string) {
  if (ruleName === 'phantom-imports') {
    logger.info('Rule: phantom-imports');
    console.log('\nDescription: Detects imports of packages not in package.json or non-existent files.');
    console.log('Severity: HIGH');
    console.log('Suggestion: Run "npm install <package>" or check the file path.');
    console.log('\n❌ Bad Example:');
    console.log('import { magic } from "non-existent-pkg";');
    console.log('\n✅ Good Example:');
    console.log('import { realExport } from "installed-pkg";');
    return;
  }

  if (ruleName === 'missing-await') {
    logger.info('Rule: missing-await');
    console.log('\nDescription: Detects calls to async functions or promises that are not awaited.');
    console.log('Severity: HIGH');
    console.log('Suggestion: Add "await" before the call or handle with .then().');
    console.log('\n❌ Bad Example:');
    console.log('const user = getUser();');
    console.log('\n✅ Good Example:');
    console.log('const user = await getUser();');
    return;
  }

  const securityRule = SECURITY_RULES.find(r => r.id === ruleName);
  if (securityRule) {
    logger.info(`Rule: ${securityRule.id}`);
    console.log(`\nDescription: ${securityRule.message}`);
    console.log(`Severity: ${securityRule.severity}`);
    console.log(`Suggestion: ${securityRule.suggestion}`);
    if (securityRule.exampleBad) {
      console.log('\n❌ Bad Example:');
      console.log(securityRule.exampleBad);
    }
    if (securityRule.exampleGood) {
      console.log('\n✅ Good Example:');
      console.log(securityRule.exampleGood);
    }
    return;
  }

  const deprecatedRule = DEPRECATED_RULES.find(r => r.name === ruleName);
  if (deprecatedRule) {
    logger.info(`Rule: deprecated/${deprecatedRule.name}`);
    console.log(`\nDescription: ${deprecatedRule.message}`);
    console.log(`Replacement: ${deprecatedRule.replacement}`);
    if (deprecatedRule.exampleBad) {
      console.log('\n❌ Bad Example:');
      console.log(deprecatedRule.exampleBad);
    }
    if (deprecatedRule.exampleGood) {
      console.log('\n✅ Good Example:');
      console.log(deprecatedRule.exampleGood);
    }
    return;
  }

  const hallucinationRule = HALLUCINATION_RULES.find(r => r.name === ruleName);
  if (hallucinationRule) {
    logger.info(`Rule: hallucination/${hallucinationRule.name}`);
    console.log(`\nDescription: ${hallucinationRule.message}`);
    console.log(`Suggestion: ${hallucinationRule.suggestion}`);
    if (hallucinationRule.exampleBad) {
      console.log('\n❌ Bad Example:');
      console.log(hallucinationRule.exampleBad);
    }
    if (hallucinationRule.exampleGood) {
      console.log('\n✅ Good Example:');
      console.log(hallucinationRule.exampleGood);
    }
    return;
  }

  logger.error(`Rule '${ruleName}' not found.`);
}
