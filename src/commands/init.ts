import inquirer from 'inquirer';
import { writeFile } from 'fs/promises';
import path from 'path';
import { logger } from '../utils/logger.js';

export async function initCommand(options: any) {
  if (options.yes) {
    await writeDefaultConfig();
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'include',
      message: 'Which directories should be audited?',
      choices: ['src', 'lib', 'app', 'components'],
      default: ['src'],
    },
    {
      type: 'list',
      name: 'severity',
      message: 'What is the minimum severity to report?',
      choices: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'],
      default: 'HIGH',
    },
  ]);

  const config = {
    include: answers.include.map((dir: string) => `${dir}/**/*.{js,ts,jsx,tsx}`),
    severity: answers.severity,
    rules: {},
  };

  await writeFile(
    path.join(process.cwd(), '.aivetrc.json'),
    JSON.stringify(config, null, 2)
  );

  logger.success('.aivetrc.json created successfully.');
}

async function writeDefaultConfig() {
  const config = {
    include: ['src/**/*.{js,ts,jsx,tsx}'],
    severity: 'HIGH',
    rules: {},
  };
  await writeFile(
    path.join(process.cwd(), '.aivetrc.json'),
    JSON.stringify(config, null, 2)
  );
  logger.success('.aivetrc.json created successfully with defaults.');
}
