---
title: "Vue3实现自定义右键菜单"
date: "2020-06-07"
description: "使用Vue3实现自定义鼠标右键菜单，支持二级菜单、自定义样式、回调函数等功能，同时提供封装成Vue指令调用。"
tag: "Personal"
---

使用Vue3实现自定义鼠标右键菜单，支持二级菜单、自定义样式、回调函数等功能，同时提供封装成Vue指令调用。

## 初步构思

+ 不需要直接处理右键菜单事件，仅用Vue构建右键菜单UI组件
+ 接收一个菜单项数组配置，菜单项中提供点击菜单后回调函数，可以自定义传入回调函数的参数
+ 将菜单DOM中的样式尽量抽离出可配置，并利用CSS变量注入
+ 提供`show`方法接收`x,y`定位参数，然后显示菜单，同时要加入检查窗口碰撞后的处理
+ 由于右键菜单的特殊性，可封装组件为单实例，页面上只会存在一个菜单实例，可优化性能

## 具体设计

### 菜单项列表-menuList

`menuList`作为必传参数，用于渲染出菜单项，接收一个长度至少为1的数组，同时可以指定`children`属性用于渲染二级菜单。

菜单项中的配置尽量做成同时接收函数的方式，以便可以通过传入的参数更快动态配置出不同的菜单。

当前支持以下菜单项配置:

|参数|说明|类型|可选值|默认值|
|:---|:---|:---|:---|:---|
|fn|点击菜单后执行的回调,回调参数1为用户传入的params, 参数2为点击右键时所在的HtmlElement元素（使用document.elementFromPoint获取）, 参数3为指令绑定的当前元素|`(params, activeEl, bindingEl) => void`|-|-|
|label|菜单名, 可使用函数，回调参数同fn选项|String, Function|-|-|
|tips|菜单辅助文本（处于右侧的文本），可使用函数，回调参数同fn选项|String, Function|-|-|
|icon|菜单图标的类名（字体图标)|String|-|-|
|hidden|菜单项是否隐藏，可使用函数，回调参数同fn选项|Boolean, Function|-|-|
|disabled|菜单项是否不可点击，可使用函数，回调参数同fn选项|Boolean, Function|-|-|
|children|子菜单的菜单项数组（配置与此表一致，但目前仅支持二级菜单）|Array|-|-|
|line|是否为分割线,该值为True时,以上设置均失效|Boolean|-|-|

菜单在每次打开时都会调用以下方法去格式化出最终的菜单项:

```ts
const formatterFnOption = (list: MenuSetting[], clickDomEl: HTMLElement, el: HTMLElement, params: any): MenuSetting[] => {
  return list.map(item => {
    if (item.children) {
      // 对子菜单进行递归处理
      item.children = formatterFnOption(item.children, clickDomEl, el, params);
    }
    if (isFunction(item.label)) {
      item.label = item.label(params, clickDomEl, el);
    }
    if (isFunction(item.tips)) {
      item.tips = item.tips(params, clickDomEl, el);
    }
    if (isFunction(item.hidden)) {
      item.hidden = item.hidden(params, clickDomEl, el);
    }
    if (isFunction(item.disabled)) {
      item.disabled = item.disabled(params, clickDomEl, el);
    }
    return item;
  });
};
```

Waiting to finish...