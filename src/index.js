#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.cyan('\nHobbyReact - A minimal React project scaffolding tool'));
console.log(chalk.white('- 🚀 Quick project setup'));
console.log(chalk.white('- ⚡️ Powered by Vite'));
console.log(chalk.white('- 🎨 Clean and minimal template'));
console.log(chalk.white('- 📦 Modern React setup\n'));

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What is the name of your project?',
    validate: (input) => {
      if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
      return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

const createProject = async (projectName) => {
  const currentDir = process.cwd();
  const projectDir = path.resolve(currentDir, projectName);
  const templateDir = path.resolve(__dirname, '../template');

  try {
    // Create project directory
    await fs.mkdir(projectDir);

    // Copy template files
    await fs.copy(templateDir, projectDir);

    // Update package.json
    const packageJsonPath = path.join(projectDir, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    console.log(chalk.green('\n✅ Project created successfully!\n'));
    console.log(chalk.cyan('To get started:'));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white('  npm install'));
    console.log(chalk.white('  npm run dev\n'));

  } catch (err) {
    console.error(chalk.red('Error creating project:'), err);
    process.exit(1);
  }
};

inquirer.prompt(questions)
  .then((answers) => {
    createProject(answers.projectName);
  })
  .catch((error) => {
    console.error(chalk.red('Error:'), error);
    process.exit(1);
  }); 