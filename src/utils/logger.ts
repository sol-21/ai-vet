import chalk from 'chalk';

export const logger = {
  info: (message: string) => console.log(chalk.blue('info'), message),
  warn: (message: string) => console.log(chalk.yellow('warn'), message),
  error: (message: string) => console.error(chalk.red('error'), message),
  success: (message: string) => console.log(chalk.green('success'), message),
  bold: (message: string) => chalk.bold(message),
  dim: (message: string) => chalk.dim(message),
  critical: (message: string) => console.error(chalk.bgRed.white.bold(' CRITICAL '), message),
};
