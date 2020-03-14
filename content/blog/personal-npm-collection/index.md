---
title: "常用NPM全局包记录"
date: "2020-03-09"
description: "记录在前端后端开发中用到的全局NPM包及其作用或API，与安装时要注意的地方"
tag: "Personal"
---

NPM全局安装的包默认会安装在 **C:\Users\\[当前用户]\AppData\Roaming\npm** 目录下(windows)，并且会加入到系统环境变量中。若因电脑权限问题无法写入，在使用这些全局包时，就需要使用全路径访问

### 目录

1. [pm2](#pm2)
2. [cnpm](#cnpm)
3. [rimraf](#rimraf)
4. [nodemon](#nodemon)
5. [verdaccio](#verdaccio)
6. [Gastby相关](#gastby相关)

## pm2
> pm2是一个进程管理工具，可用于管理nodejs应用的进程，支持性能监控，进程守护，负载均衡等功能

以下为pm2常用命令
1. 启动 pm2 start main.js
    + --name 指定进程名
    + --watch 监听代码变化进行热重启
2. 查看 pm2 list
3. 移除 pm2 delete [name]/all
4. 暂停 pm2 stop [name]/all
5. 重启 pm2 restart  [name]/all
6. 日志 pm2 logs [name]
7. 详情 pm2 describe [name]
8. 资源监控 pm2 monitor

## cnpm
> cnpm是由阿里巴巴团队出品国内NPM源镜像管理工具，默认源为https://registry.npm.taobao.org ，同步频率目前为 10分钟 一次

cnpm与npm安装依赖的命令及参数是保持一致，例如仍然可以使用 --registry 指定上游依赖源。

cnpm与npm安装依赖的方法不太一样，原则上使用cnpm安装会快很多。但需要注意的是，使用cnpm安装依赖时，在依赖安装过程涉及一些无法访问的国外站点资源，即使把这个资源下载放在本地的 **C:\Users\\[当前用户]\AppData\Roaming\npm-cache** 目录下，cnpm也不会去这个目录找，这时就要切换回使用npm安装了。

## rimraf
> 对rm -rf命令的封装

安装该全局包后，使用rimraf指定文件名或文件夹名就可以快速删除。可用于快速删除node_modules文件夹，原则上会比windows手动删除快很多。请谨慎使用该删除命令，该命令删除文件是彻底删除的，不会放在回收站。

*该依赖包亦可单独用于nodejs环境中，提供以下方法，可以递归删除文件夹或文件，*

```js
const rimraf = require('rimraf');
rimraf('/dist', function (err) {
  console.log(err);
});
```

## nodemon
> Node自动重启工具

使用nodemon代替node命令来启动nodejs项目，会自动监听代码变化，在保存文件的时候自动重启nodejs服务。

## verdaccio
> 可搭建本地NPM仓库、内网NPM私服

官网：**<a href="https://verdaccio.org/" target="_blank">https://verdaccio.org/</a>**  
本人私服：**<a href="http://kongfandong.cn/npm/" target="_blank">http://kongfandong.cn/npm/</a>**

使用 **npm i verdaccio -g** 后，执行verdaccio即可启动本地NPM服务。启动后在 **C:\Users\\[当前用户]\AppData\Roaming\verdaccio** 生成其配置。
+ **storage**：npm包缓存文件夹，若搭建内网NPM时，可把对应依赖复制到该文件夹，然后使用npm install --registry=[服务访问地址]便可离线安装NPM包
+ **config.yaml**：配置文件，这里可以更改NPM上游源、服务站点端口、NPM包上传下载浏览的权限、反向代理前缀等，具体请参考官网API文档
+ **htpasswd**：记录NPM账户

**发布NPM包流程**
+ 更新版本号: npm version patch
+ 设置NPM源: npm set registry http://kongfandong.cn/npm/
+ 若未注册，先注册: npm adduser
+ 登录: npm login
+ 发布: npm publish


<br/>
<br/>
<br/>
<br/>

<span id="gastby相关"></span>
*以下记录安装gatbsy搭建静态站点服务需要安装的全局包*

### windows-build-tools
> 使用 NPM 安装 Visual Studio, C++ Build Tools, Python 到 Windows

**需使用管理员权限执行命令 npm i -g windows-build-tools**  
该工具安装的python版本为2.7，并不支持3.X版本

### gatsby
> 基于 React 与 GraphQL 的开箱即用的网站快速构建框架

官网：**<a href="https://www.gatsbyjs.org/" target="_blank">https://www.gatsbyjs.org/</a>**

使用gatbsy搭建静态站点服务时，有部分依赖资源需要访问国外站点下载

*若为 gatsby-starter-blog项目安装依赖时，有可能出现 libvips无法下载的问题，可以访问其站点将资源下载到本地的 C:\Users\Administrator\AppData\Roaming\npm-cache\\_libvips\\ 目录下后再重试*



