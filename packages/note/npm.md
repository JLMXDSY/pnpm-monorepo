## [npm](https://zhuanlan.zhihu.com/p/24357770)

- 概念：假设你下载一个包就需要去包的官网或者github去找，如果一个项目依赖多的话，这是很麻烦得一个事情，所以就有了npm（一个用js写的运行在node上的包管理工具，全称：Node Package Manager）,通过一个json配置记录所有需要安装的包信息（包括作者、包下载地址等等，即package.json）

- 能做什么
  npm其实有一个代码仓库，想分享代码的人通过`npm publish`把代码提交到代码仓库
  如果有人想使用仓库里别人分享的代码，可以手动配置这些包到package.json然后`npm install`，或者通过`npm install 具体包名` 来下载
  npm就会帮他把这些包都下载到node_modules文件夹里，然后就可以随意使用这些包了

- 安装

  ```
  npm i|install <modalname>  // 安装但不写入package.json
  npm install <modalname> -S|--save //安装并写入package.json的dependencies
  npm install <modalname> -D|--save-dev //安装并写入package.json的devDependecies
  npm install -g|-global <modalname>  // 全局安装
  npm install <modalname> -f|--force //不管是否装过，强制重装
  npm install xxx@1.2.0  // 安装指定版本
  sudo npm install 
  ```

- 更新

  ```
  npm outdated // 检查当前项目所依赖的模块，是否已经有新版本
  npm update <modalnem> // 指定更新模块儿
  npm updat -g <modalname> //更新全局安装的模块儿
  ```

- 删除

  ```
  npm uninstall <modalname> //删除指定模块儿
  npm uninstall -g <modalname> // 删除全局安装的模块儿
  rm -rf node_modules //删除node_modules目录
  ```

- 查看

  ```
  npm help //查看npm命令列表
  npm -l // 查看命令简单用法
  npm -v // 查看npm版本
  npm config list -l //查看npm配置
  npm list // 以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。
  npm list <modalname> // 查看指定模块儿
  npm list -global // 列出全局安装的模块儿
  ```

- 执行脚本

  ```
  npm run|run-script //执行package.json中的script中的脚本
  npm test 和npm start 是两个内置命令 相当于 npm run test｜start
  ```

- 避免系统权限

  默认情况下，Npm全局模块都安装在系统目录（比如`/usr/local/lib/`），普通用户没有写入权限，需要用到`sudo`命令。这不是很方便，我们可以在没有root权限的情况下，安装全局模块。

  首先，在主目录下新建配置文件`.npmrc`，然后在该文件中将`prefix`变量定义到主目录下面。

  ```bash
  prefix = /home/yourUsername/npm
  ```

  然后在主目录下新建npm子目录。

  ```bash
  mkdir ～/npm
  ```

  此后，全局安装的模块都会安装在这个子目录中，npm也会到`~/npm/bin`目录去寻找命令。

  最后，将这个路径在`.bash_profile`文件（或`.bashrc`文件）中加入PATH变量。

  ```bash
  export PATH=~/npm/bin:$PATH
  ```

