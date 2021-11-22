const path = require("path");
const fs = require('fs-extra')
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn-promise');
const { Command } = require("commander");
const inquirer = require('inquirer')
const chalk = require("chalk");
const program = new Command();

const packageJson = require("../package.json");

let projectName = "";  //  项目名称
let templateName = ""; // 模板名称

init()

function init() {
  program
    .version(packageJson.version)
    .command("init <project-name>")
    .description("初始化一个前端项目")
    .action((projectName) => {
        console.log(chalk.green(`项目名称：${projectName}`));
        inquirer.prompt([
            {
              type: 'input',
              name: 'projectName',
              message: '请输入项目名称?',
              default: projectName
            },
            {
                type: 'list',
                name: 'templateName',
                message: '请选择模板?',
                choices: [
                    'template-pc',
                    'template-h5',
                    'template-mini-program'
                ]
            }
        ]).then((answers) => {
            projectName = answers.projectName;
            templateName = answers.templateName;
            console.log(chalk.green(`已确定项目名称:${chalk.cyan(projectName)}`));
            console.log(chalk.green(`已选择项目模板:${chalk.cyan(templateName)}`));
            createApp(projectName, templateName);
          })
    })

  program.parse(process.argv);
}


function createApp(projectName, templateName) {
    if(projectName && templateName) {
        const root = path.resolve(projectName);

        fs.ensureDirSync(root);
        console.log(chalk.cyan(`项目文件夹创建完成`));
        console.log()
        console.log(chalk.green(`正在初始化工程....`));
        console.log()
        // 更改工作目录到新建的文件夹
        process.chdir(root);

        cloneTemplate(projectName, templateName, root)
    } else {
        console.log(chalk.red(`参数异常`));
        process.exit(1)
    }
}


function cloneTemplate(projectName, templateName, root) {
    tryGitInit()
    tryGitClone(templateName);
    const templateRoot = path.join(root, templateName);
    fs.copySync(templateRoot, root)
    fs.removeSync(templateRoot)
    updatePackageJson(projectName)
    install(projectName);
}

function tryGitInit() {
    try {
        console.log(chalk.green(`正在进行 git init 操作`));
        execSync('git init', { stdio: 'ignore' });
        console.log(chalk.cyan(`git init 成功`));
        console.log()
    } catch (e) {
        console.log(chalk.red('git init 失败'));
        console.log(e);
        process.exit(1)
    }
}

function tryGitClone() {
    try {
        console.log(chalk.green(`正在进行 git clone 操作`));
        execSync(`git clone https://gitee.com/thiszhangjin/${templateName}.git`, { stdio: 'ignore' });
        console.log(chalk.cyan(`git clone 成功`));
        console.log()
        return true;
    } catch (e) {
        console.log(chalk.red('git clone 失败'));
        console.log(e);
        process.exit(1)
    }
}

function updatePackageJson(projectName, root) {
    const packageJsonString = fs.readFileSync('package.json', 'utf8');
    const packageJson = JSON.parse(packageJsonString);
    packageJson.name = projectName;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))
}

function install(projectName) {
    console.log(chalk.green(`依赖安装中`));
    const command = 'cnpm'
    const args = ['install']
    const options =  { stdio: 'inherit' }
    spawn(command, args, options)
    .then((stdout) => {
        console.log(chalk.cyan(`依赖安装完成`));
        console.log()
        console.log(chalk.green(`cd ${projectName}`));
        console.log(chalk.green(`npm run start 启动项目`));
        console.log(chalk.green(`npm run build 打包项目`));
        console.log(chalk.green(`ending`));
      })
      .catch((error) => {
        console.log(chalk.red(`依赖安装失败，请手动安装`));
      })
    
}