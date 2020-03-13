---
title: "常用NPM全局包记录"
date: "2020-03-09"
description: "记录在前端后端开发中用到的全局NPM包及其作用或API，与安装时要注意的地方"
tag: "Personal"
---

### pm2
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

### cnpm
> cnpm是由阿里巴巴团队出品国内NPM源镜像管理工具，默认源为https://registry.npm.taobao.org ，同步频率目前为 10分钟 一次

cnpm与npm命令保持一致，可以使用--registry指定上游依赖源
