---
title: "个人常用代码收藏"
date: "2020-01-30"
description: "记录个人开发常用CSS、JS代码"
tag: "Personal"
---

**记录个人开发常用CSS、JS代码**

### 目录
1. [CSS全局默认样式base.css](#base), <a href="./base.css" target="_blank">下载base.css</a>
2. [Nodejs返回数据模板response.js](#response), <a href="./response.js" target="_blank">下载response.js</a>
3. [Nodejs连接Mysql封装async-mysql.js](#mysql), <a href="./async-mysql.js" target="_blank">下载async-mysql.js</a>

代码展示

**<a id="base" href="./base.css" target="_blank">base.css</a>**

```css
/* reset default */
body, p, h1, h2, h3, h4, h5, h6, div, ul, li, ol, dl, dd, dt,
nav, main, title, aside, footer, section {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul, li {
  list-style: none;
}

/* 浮动 */
.clear {
  zoom: 1;
}
.clear:after {
  content: '';
  clear: both;
  display: table;
}
.fl {
  float:left;
}
.fr {
  float: right;
}

/* 溢出省略号 */
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* vue transition fadeInUp */
.fadeInUp-enter-active {
  animation: fadeInUp 0.5s;
}
.fadeInUp-leave-active {
  animation: fadeInUp 0.5s reverse;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

/* Chrome滚动条 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: transparent;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 6px;
  background: #bbb;
  background-clip: padding-box;
}
```

**<a id="response" href="./response.js" target="_blank">response.js</a>**

```js
class Response {
  success(message = '操作成功') {
    return {
      code: 200,
      message
    }
  }
  successData(data = [], message = '数据获取成功') {
    return {
      code: 200,
      message,
      data
    }
  }
  successPage(
    items = [],
    page = 1,
    pageSize = 10,
    total = 0,
    message = '数据获取成功'
  ) {
    return {
      code: 200,
      message,
      data: {
        items,
        page,
        pageSize,
        total
      }
    }
  }
  loginError() {
    return {
      code: 300,
      message: '登录状态异常!'
    }
  }
  parameterError() {
    return {
      code: 301,
      message: '参数错误'
    }
  }
  error(code = 302, message = '未知错误') {
    return {
      code,
      message
    }
  }
}
module.exports = Response
```

**<a id="mysql" href="./async-mysql.js" target="_blank">async-mysql.js</a>**

```js
const mysql = require('mysql')
const { host, user, password, database } = require('../config')
const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  multipleStatements: true
})

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

const transactionQuery = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.beginTransaction(err1 => {
          if (err1) {
            return reject('开启事务失败')
          } else {
            connection.query(sql, values, (err2, rows) => {
              if (err2) {
                return connection.rollback(() => {
                  console.log('数据插入失败数据回滚')
                  return reject('数据插入失败数据回滚')
                })
              } else {
                connection.commit(err3 => {
                  if (err3) {
                    console.log('事务提交失败')
                    return reject('事务提交失败')
                  }
                })
                resolve(rows)
                connection.release()
              }
            })
          }
        })
      }
    })
  })
}

module.exports = { query, transactionQuery }
```

