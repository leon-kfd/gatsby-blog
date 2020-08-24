---
title: "Vue to drag directive"
date: "2020-06-06"
description: "使用vue指令的方式为Fixed定位的元素加入可拖拽功能，该插件同时支持原生JS调用"
outlinkAddress: "https://www.kongfandong.cn/howdy/to-drag-directive"
tag: "Vue Directive"
---

[View Online Document](https://www.kongfandong.cn/howdy/to-drag-directive)

# To Drag Directive

**Vue指令-to-drag**

## 特性
1. 通过vue指令将fixed元素设为可拖动
2. 提供不吸附、左右吸附、四方向吸附三种模式
3. 同时支持PC端和移动端

## 配置
### Value (Objcet)
|参数|说明|类型|可选值|默认值|
|:---|:---|:---|:---|:---|
|moveCursor|是否显示移动光标(cursor: move)|Boolean|-|true|
|**adsorb**|是否开启边缘吸附，默认为不开启，设为1则为左右吸附，设为2为四方向吸附|Number|0/1/2|0|
|adsorbOffset|开启吸附后，吸附边缘的偏移量，单位为px|Number|-|0|
|transitionDuration|吸附动画的过渡效果的持续时间,单位为ms|Number|-|400|
|transitionTimingFunction|吸附动画的过渡效果的动画曲线|String|-|ease-in-out|
|immediateEvent|是否初始化时立即执行一遍toDragEnd事件回调|Boolean|-|false|

### Event

+ **toDragStart**: 拖拽开始事件
+ **toDragMove**：拖拽移动事件
+ **toDragEnd**：拖拽结束时间

它们都提供以下的回调参数：
+ width：当前拖拽元素的宽
+ height：当前拖拽元素的宽
+ top：当前拖拽元素的上偏移
+ left：当前拖拽元素的左偏移
+ maxX：当前屏幕的宽度（不包含滚动条）
+ maxY：当前屏幕的高度（不包含滚动条）

*一般在回调中将位置信息记录到 localstorage，在下一次初始化时填入用户上一次最后移动的信息。*

## 该插件提供原生方式使用

可以在其他非Vue应用中使用该功能，你只需要在你的页面中引入以下JS
```html
<script src="https://kongfandong.cn/cdn/howdy/to-drag.js"></script>
<script>
  // 使用
  const { ToDrag } = howdy['to-drag']
  new ToDrag(document.querySelector('#demo'))
</script>
```
**原生方式使用: <a href="https://kongfandong.cn/demo/to-drag-native-usage.html" target="_blank">在线DEMO</a>**

[View Online Document](https://www.kongfandong.cn/howdy/to-drag-directive)