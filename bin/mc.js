#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { execSync } = require('child_process');
const which = require('which');

const OFFICIAL_REGISTRY = 'https://registry.npmjs.org';
const MIRROR_REGISTRY = 'https://registry.npmmirror.com';

// 检查包管理器是否安装
function checkPackageManager(name) {
  try {
    which.sync(name);
    return true;
  } catch (err) {
    return false;
  }
}

// 获取 registry 配置
function getRegistry(manager) {
  try {
    return execSync(`${manager} config get registry`).toString().trim();
  } catch (err) {
    return '未配置';
  }
}

// 设置 registry
function setRegistry(manager, registry) {
  try {
    execSync(`${manager} config set registry ${registry}`);
    return true;
  } catch (err) {
    return false;
  }
}

program
  .version('1.0.0')
  .description('包管理器 registry 配置工具');

// ls 命令
program
  .command('ls')
  .description('列出当前包管理器的 registry 配置')
  .action(() => {
    let hasManagers = false;
    console.log(chalk.blue('当前 registry 配置：'));
    
    if (checkPackageManager('npm')) {
      hasManagers = true;
      console.log(chalk.green('npm:'), getRegistry('npm'));
    }
    
    if (checkPackageManager('yarn')) {
      hasManagers = true;
      console.log(chalk.green('yarn:'), getRegistry('yarn'));
    }
    
    if (checkPackageManager('pnpm')) {
      hasManagers = true;
      console.log(chalk.green('pnpm:'), getRegistry('pnpm'));
    }

    if (!hasManagers) {
      console.log(chalk.yellow('未检测到任何包管理器'));
    }
  });

// use 命令
program
  .command('use')
  .description('切换到淘宝镜像源')
  .action(() => {
    let hasManagers = false;
    
    if (checkPackageManager('npm')) {
      hasManagers = true;
      if (setRegistry('npm', MIRROR_REGISTRY)) {
        console.log(chalk.green('npm registry 已切换到淘宝镜像'));
      }
    }
    
    if (checkPackageManager('yarn')) {
      hasManagers = true;
      if (setRegistry('yarn', MIRROR_REGISTRY)) {
        console.log(chalk.green('yarn registry 已切换到淘宝镜像'));
      }
    }
    
    if (checkPackageManager('pnpm')) {
      hasManagers = true;
      if (setRegistry('pnpm', MIRROR_REGISTRY)) {
        console.log(chalk.green('pnpm registry 已切换到淘宝镜像'));
      }
    }

    if (!hasManagers) {
      console.log(chalk.yellow('未检测到任何包管理器'));
    }
  });

// unuse 命令
program
  .command('unuse')
  .description('切换到官方源')
  .action(() => {
    let hasManagers = false;
    
    if (checkPackageManager('npm')) {
      hasManagers = true;
      if (setRegistry('npm', OFFICIAL_REGISTRY)) {
        console.log(chalk.green('npm registry 已切换到官方源'));
      }
    }
    
    if (checkPackageManager('yarn')) {
      hasManagers = true;
      if (setRegistry('yarn', OFFICIAL_REGISTRY)) {
        console.log(chalk.green('yarn registry 已切换到官方源'));
      }
    }
    
    if (checkPackageManager('pnpm')) {
      hasManagers = true;
      if (setRegistry('pnpm', OFFICIAL_REGISTRY)) {
        console.log(chalk.green('pnpm registry 已切换到官方源'));
      }
    }

    if (!hasManagers) {
      console.log(chalk.yellow('未检测到任何包管理器'));
    }
  });

program.parse(process.argv);
