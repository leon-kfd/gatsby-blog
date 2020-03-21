---
title: "个人常用代码收藏"
date: "2020-01-30"
description: "记录个人开发常用CSS、JS代码"
tag: "Personal"
---

**记录个人开发常用CSS、JS代码**

### 目录
1. [CSS全局默认样式base.css](#base), <a href="./base.css" target="_blank">下载base.css</a>
2. [JS个人常用工具函数helper.js](#helper), <a href="./helper.js" target="_blank">下载helper.js</a>
3. [Nodejs返回数据模板response.js](#response), <a href="./response.js" target="_blank">下载response.js</a>
4. [Nodejs连接Mysql封装async-mysql.js](#mysql), <a href="./async-mysql.js" target="_blank">下载async-mysql.js</a>
5. [VSCode个人首选项配置setting.json](#VSSetting), <a href="./setting.json" target="_blank">下载setting.json</a>

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

**<a id="helper" href="./helper.js" target="_blank">helper.js</a>**
```js
/**
 * 速览
 * 函数节流: throttle(fn, wait)
 * 函数防抖: debounce(fn, delay)
 * 类型检测: typeTest(target)
 * 深拷贝: deepClone(obj)
 * 滚动到指定位置: scrollTo(top, duration, selector = window)
 * 加载外部Script：loadScript(url)
 */

/**
* 函数节流
* @param {Function} fn 实际要执行的函数
* @param {Number} wait 执行间隔，单位是毫秒（ms），默认100ms
* @return {Function}  返回一个“节流”函数
*/
export function throttle (fn, wait = 100) {
  let timer = null
  let previous // 上次执行时间
  return function () {
    const context = this
    const args = arguments
    const now = +new Date()
    if (previous && now < previous + wait) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        previous = now
        fn.apply(context, args)
      }, wait)
    } else {
      previous = now
      fn.apply(context, args)
    }
  }
}

/**
* 函数防抖
* @param {Function} fn 实际要执行的函数
* @param {Number} delay 延迟时间，单位是毫秒（ms）
* @return {Function}
*/
export function debounce (fn, delay = 1000) {
  let timer
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 类型检测
 * @param {Any} element 传入需要检测的元素
 * @return {String}
 */
export function typeTest (target) {
  var classType = {}
  'Array Date RegExp Object Error'.split(' ').map(item => {
    classType[`[object ${item}]`] = item.toLowerCase()
  })
  if (target == null) return String(target)
  return typeof target === 'object' ? classType[Object.prototype.toString.call(target)] || 'object' : typeof element
}

/**
 * 深拷贝
 * @param {Object} obj
 * @return {Object}
 */
export function deepClone (obj) {
  var objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

/**
* 滚动到指定位置
* @param {number} top 滚到到指定位置的高度
* @param {number} duration 滚动时长
* @param {object} selector 滚动条不在body上时，需传入当前滚动条所在javascriptDom元素
*/
export function scrollTo (top, duration, selector = window) {
  // 兼容requestionAnimationFrame
  (function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function (callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
  }());
  const lastTop = selector === window ? (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) : selector.scrollTop
  const startTime = new Date()
  let timer
  function scrollAnimate () {
    const time = new Date() - startTime
    selector.scrollTo(0, lastTop + (top - lastTop) * (time / duration))
    timer = window.requestAnimationFrame(scrollAnimate)
    if (time >= duration) {
      selector.scrollTo(0, top)
      window.cancelAnimationFrame(timer)
    }
  }
  window.requestAnimationFrame(scrollAnimate)
}

/**
 * 加载外部Script
 * @param {String} url
 * @return {Promise}
 */
export function loadScriptSync (url) {
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null
            resolve(1)
          }
        };
      } else {
        script.onload = function () {
          resolve(1)
        };
      }
      script.src = url
      document.getElementsByTagName('head')[0].appendChild(script);
    } catch (e) {
      reject(e)
    }
  })
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

**<a id="VSSetting" href="./setting.json" target="_blank">setting.json</a>**

插件版本
+ Vetur V0.22.6
+ ESLint V2.1.1

```json
{
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
    },
    "prettier": {
      "semi": false,
      "singleQuote": true
    }
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.tslint": true,
    "source.fixAll.stylelint": true
  },
  "editor.tabSize": 2,
  "eslint.options": {
    "parser": "babel-eslint"
  }
}
```

