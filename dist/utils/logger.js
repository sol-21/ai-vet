import chalk from 'chalk';
export const logger = {
    info: (message) => console.log(chalk.blue('info'), message),
    warn: (message) => console.log(chalk.yellow('warn'), message),
    error: (message) => console.error(chalk.red('error'), message),
    success: (message) => console.log(chalk.green('success'), message),
    bold: (message) => chalk.bold(message),
    dim: (message) => chalk.dim(message),
    critical: (message) => console.error(chalk.bgRed.white.bold(' CRITICAL '), message),
};
//# sourceMappingURL=logger.js.map