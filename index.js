#!/usr/bin/env node

import { program } from "commander";
import download from "download-git-repo";
import ora from "ora";
import rimraf from "rimraf";
import chalk from "chalk";

const token = "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";

program
  .argument("<app-name>")
  .description("Create a new production ready app template")
  .option(
    "--next-ts-tailwind",
    "Generate a Next.js, TypeScript, and Tailwind CSS template"
  )
  .option(
    "--redux-chakra-vite",
    "Generate a Redux, Chakra UI, and Vite template"
  )
  .option(
    "--redux-tailwind-vite",
    "Generate a Redux, Tailwind CSS, and Vite template"
  )
  .action((appName, options) => {
    let template = "j-prajwal/create-starter-templates";

    if (options.nextTsTailwind) {
      template = "j-prajwal/create-starter-templates";
    } else if (options.reduxChakraVite) {
      template =
        "J-Prajwal/create-starter-templates#templates/redux-chakra-vite";
    } else if (options.reduxTailwindVite) {
      template = "j-prajwal/create-starter-templates";
    }

    console.log(
      chalk.blue(
        `Creating a new React app called ${appName} using the ${template} template...`
      )
    );
    const spinner = ora("Downloading template...").start();
    download(
      template,
      appName,
      {
        clone: true,
        checkout: "main",
        headers: { Authorization: `token ${token}` },
      },
      (err) => {
        if (err) {
          spinner.fail(chalk.red("Error downloading template"));
          console.log(err);
        } else {
          spinner.succeed(chalk.green("Template downloaded successfully"));
          console.log(chalk.green(`Created new React app called ${appName}`));
          rimraf(`${appName}/.git`, () => {
            console.log(chalk.green(".git directory removed"));
          });
        }
      }
    );
  });

program.parse(process.argv);
