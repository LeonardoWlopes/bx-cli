#!/usr/bin/env node
const arg = require("arg");
const chalk = require("chalk");
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const fs = require("fs");

const execAsync = util.promisify(exec);

const draw = {
  header: (pkg) => {
    console.log(`Bx-CLI version: ${pkg.version}\n`);
  },
  usage: () => {
    console.log(`${chalk.whiteBright("tool [CMD]")}
                    ${chalk.greenBright("--start")}\tStarts the app
                    ${chalk.greenBright("--build")}\tBuilds the app`);
  },
};

async function main() {
  try {
    let pkg;
    try {
      pkg = require(path.join(process.cwd(), "package.json"));
    } catch (err) {
      throw new Error("Erro ao ler o arquivo package.json");
    }

    draw.header(pkg);

    const args = arg({
      "--generate-config": Boolean,
    });

    if (args["--generate-config"]) {
      const dependenciesToCheck = [
        "@rocketseat/eslint-config",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "eslint",
        "eslint-plugin-react-hooks",
        "eslint-plugin-unused-imports",
        "prettier",
        "typescript",
      ];

      const installedDependencies = new Set(
        Object.keys(pkg.devDependencies || {})
      );
      const missingDependencies = dependenciesToCheck.filter(
        (dep) => !installedDependencies.has(dep)
      );

      let installingDependenceIndex = -1;

      function printDependencies() {
        console.clear();
        draw.header(pkg);
        console.log("Installing dependencies...\n");

        dependenciesToCheck.forEach((dep, index) => {
          if (installedDependencies.has(dep)) {
            console.log("✅" + chalk.green(dep));
            return;
          }

          if (index === installingDependenceIndex) {
            console.log(chalk.yellow(dep) + " (installing...)");
            return;
          }

          console.log(chalk.red(dep));
        });
      }

      if (missingDependencies.length > 0) {
        for (const dep of missingDependencies) {
          const depIndex = dependenciesToCheck.indexOf(dep);

          installingDependenceIndex = depIndex;

          try {
            printDependencies();
            await execAsync(`npm install ${dep} --save-dev`);
            installedDependencies.add(dep);
          } catch (error) {
            throw new Error(`Error installing ${dep}`);
          } finally {
            installingDependenceIndex = -1;
            printDependencies();
          }
        }
      } else {
        console.log(
          chalk.green("✅" + "All dependencies are already installed")
        );
      }

      //here

      const source = path.join(__dirname, "..", "templates");

      const files = fs.readdirSync(source);

      for (const file of files) {
        const sourceFile = path.join(source, file);
        const targetFile = path.join(process.cwd(), file);

        if (fs.existsSync(targetFile)) {
          console.log(chalk.yellow(`File ${file} already exists`));
          continue;
        }

        fs.copyFileSync(sourceFile, targetFile);
        console.log(chalk.green(`File ${file} created`));
      }
    }
  } catch (e) {
    console.log(chalk.red(e.message));
    console.log();
    draw.usage();
  }
}
main();
