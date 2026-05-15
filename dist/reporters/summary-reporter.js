import chalk from 'chalk';
export class SummaryReporter {
    report(results) {
        for (const result of results) {
            const issueCount = result.issues.length;
            if (issueCount > 0) {
                console.log(`${chalk.red('✖')} ${result.file}: ${issueCount} issues found.`);
            }
            else {
                console.log(`${chalk.green('✔')} ${result.file}: clean.`);
            }
        }
    }
}
//# sourceMappingURL=summary-reporter.js.map