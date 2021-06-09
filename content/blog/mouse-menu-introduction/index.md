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

## 功能说明

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

+ Example: [基础菜单](https://leon-kfd.github.io/howdyjs/#/mouse-menu/example1)

### 窗口碰撞处理

菜单弹出时根据传入的坐标当作左上角定位，此时需要检测它是否碰撞到了窗口，当传入坐标加上菜单宽度或高度超出了窗口最大宽高时要进行调整。

```ts
const show = async (x = 0, y = 0) => {
  // ...some other code
  await nextTick();
  // 以下代码检测是否碰撞到了窗口
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  const menu = MenuWrapper.value;
  const menuHeight = menu.offsetHeight;
  const menuWidth = props.menuWidth || 200;
  menuLeft.value = x + menuWidth + 1 > windowWidth ? windowWidth - menuWidth - 5 : x + 1;
  menuTop.value = y + menuHeight + 1 > windowHeight ? windowHeight - menuHeight - 5 : y + 1;
};
```

因为二级菜单是悬停后才出现的，所以二级菜单的碰撞检测需同样额外去处理。

```ts
const handleMenuMouseEnter = ($event: MouseEvent, item: MenuSetting) => {
  if (item.children && !item.disabled) {
    hoverFlag.value = true;
    const el = $event.currentTarget as HTMLElement;
    if (!el) return;
    const { offsetWidth } = el;
    const subEl = el.querySelector('.__menu__sub__wrapper') as HTMLElement;
    if (!subEl) return;
    // 以下代码检测是否碰撞到了窗口
    const { offsetWidth: subOffsetWidth, offsetHeight: subOffsetHeight } = subEl;
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    const { top, left } = el.getBoundingClientRect();
    if (left + offsetWidth + subOffsetWidth > windowWidth - 5) {
      subLeft.value = left - subOffsetWidth + 5;
    } else {
      subLeft.value = left + offsetWidth;
    }
    if (top + subOffsetHeight > windowHeight - 5) {
      subTop.value = windowHeight - subOffsetHeight;
    } else {
      subTop.value = top + 5;
    }
  }
};
```

+ Example: [二级菜单](https://leon-kfd.github.io/howdyjs/#/mouse-menu/example2)

### 自定义样式

菜单样式通过CSS3变量控制，通过`menuWrapperCss`和`menuItemCss`两个Props传入修改CSS变量。

```ts
let el = MenuWrapper.value;
if (props.menuWrapperCss) {
  Object.keys(props.menuWrapperCss).map(item => {
    el.style.setProperty(`--menu-${item}`, props.menuWrapperCss && props.menuWrapperCss[item]);
  });
}
if (props.menuItemCss) {
  Object.keys(props.menuItemCss).map(item => {
    el.style.setProperty(`--menu-item-${item}`, props.menuItemCss && props.menuItemCss[item]);
  });
}
```

支持的样式如下:

**menuWrapperCss-菜单容器CSS设置**

|参数|说明|类型|可选值|默认值|
|:---|:---|:---|:---|:---|
|background|菜单容器背景色|String|-|#c8f2f0|
|boxShadow|菜单容器阴影|String|-|0 1px 5px #888|
|padding|默认padding|String|-|5px 0|
|borderRadius|圆角|String|-|4px|
|lineColor|分割线颜色|String|-|#ccc|
|lineMargin|分割线Margin|String|-|5px 0|

**menuItemCss-菜单项CSS设置**

|参数|说明|类型|可选值|默认值|
|:---|:---|:---|:---|:---|
|height|每项高度|String|-|30px|
|padding|-|String|-|0 10px|
|iconSize|图标大小|String|-|20px|
|iconFontSize|字体图标字体大小(设置类型为字体图标时可用)|String|-|null|
|iconColor|字体图标颜色|String|-|#484852|
|labelColor|菜单项标题颜色|String|-|#484852|
|labelFontSize|菜单项标题字体大小|String|-|14px|
|tipsColor|菜单辅助文字颜色|String|-|#889|
|tipsFontSize|菜单辅助文字字体大小|String|-|12px|
|arrowColor|指示箭头颜色（出现子菜单时生成）|String|-|#484852|
|arrowSize|指示箭头大小（指示箭头为使用border生成的三角形)|String|-|10px|
|disabledColor|菜单禁用状态时的颜色|String|-|#bcc|
|hoverBackground|hover时菜单项的背景色|String|-|rgba(255,255,255,.8)|
|hoverLabelColor|hover时菜单项label的颜色|String|-|null|
|hoverTipsColor|hover时菜单项tips的颜色|String|-|null|
|hoverArrowColor|hover时菜单项arrow的颜色|String|-|null|

> 对于不支持CSS变量的浏览器也可以选择覆盖CSS类名实现

+ Example: [自定义样式](https://leon-kfd.github.io/howdyjs/#/mouse-menu/example4)

## 封装成函数调用

当前只是用Vue构建了菜单组件，但并不推荐直接使用组件方式引用。为了方便使用将其封装出一个函数，在需要使用时再调用函数，这种类似`ElementUI`的`MessageBox`的调用方式。同时函数调用方式可确保页面上只会存在一个菜单实例，可优化性能。

> 函数调用方式必须在options中传入el（绑定唤起菜单的Dom元素）。

```ts
function CustomMouseMenu (options: CustomMouseMenuOptions) {
  const className = '__mouse__menu__container';
  let container:HTMLElement;
  if (document.querySelector(`.${className}`)) {
    container = document.querySelector(`.${className}`) as HTMLElement;
  } else {
    container = createClassDom('div', className);
  }
  const vm = h(MouseMenu, options);
  render(vm, container);
  document.body.appendChild(container);
  return vm.component?.proxy as ComponentPublicInstance<typeof MouseMenu>;
}
```

+ Example: [CustomMouseMenu函数调用方式](https://codepen.io/leon-kfd/pen/GRWBGrM)

## 封装成Vue3指令方式调用

因为使用指令可以提前知道菜单要绑定到哪个Dom元素中，把右键及contextmenu事件的处理封装在vue指令中，使用Vue指令可以更方便的调出菜单。Vue指令也是本插件最推荐的方法。

因为移动端下的contextmenu行为不一致，我们可以采用长按事件代替。在指令封装中，同时做了PC端右键唤起与移动端长按唤起菜单的处理。

指令实现原理主要是利用传入的参数与绑定的Dom等参数，封装用户的右键与长按事件并利用`CustomMouseMenu`函数唤出菜单。

[查看源码](https://github.com/leon-kfd/howdyjs/blob/master/packages/mouse-menu/index.ts)

指令方式使用如下：

```html
<template>
  <div v-mouse-menu="options">Dom</div>
</template>
<script>
import { MouseMenuDirective } from '@howdyjs/mouse-menu';
export default {
  directive: {
    MouseMenu: MouseMenuDirective
  },
  setup() {
    return {
      options: {} // Some Options
    }
  }
}
</script>
```

**备注说明**

为了性能，指令封装模式默认只对mounted钩子进行挂载。  
当使用场景中有params参数传入菜单函数，有可能需要在组件更新时更新菜单，这时可以同时把update也挂载上。可参考以下写法:
```js
import { MouseMenuDirective } from '@howdyjs/mouse-menu';
export default {
  directive: {
    MouseMenu: {
      ...MouseMenuDirective,
      updated: MouseMenuDirective.mounted
    }
  }
}
```

## ElementPlus table中使用右键菜单

比较常用的一个场景是在表格中右键列表项弹出菜单，并通过列表项数据显示不同的菜单。以下提供一个Vue指令方式操作原生表格的Example:

+ Example: [指令方式绑定到原生表格](https://leon-kfd.github.io/howdyjs/#/mouse-menu/example6)

由于`ElementPlus`UI库中的`el-table`提供了[row-contextmenu](https://element-plus.gitee.io/#/zh-CN/component/table#table-events)方法，这样可以很方便的让我们的右键菜单扩展到el-table中。

只要对`row-contextmenu`方法进行处理，就可以在el-table中实现右键弹出菜单功能。

```ts
showMouseMenu(row, column, event) {
  const { x, y } = event
  const ctx = CustomMouseMenu({
    el: event.currentTarget,
    params: row,
    ...this.menuOptions
  })
  ctx.show(x, y)
  event.preventDefault()
}
```

+ Example in `ElementPlusTable`: <a href="https://codepen.io/leon-kfd/pen/yLMKPOP" target="_blank">Demo</a>

## 其他说明

插件还支持其他配置，例如菜单图标，禁用模式等。

配置参数（Props/指令Value）：

|参数|说明|类型|可选值|默认值|
|:---|:---|:---|:---|:---|
|el|触发的Dom元素（以Vue组件方式或CustomMenu函数方式使用时必须传入）|-|-|-|
|menuWidth|菜单宽度|Number|-|200|
|menuList|生成菜单项的数组，具体配置参考下表|Array|-|-|
|hasIcon|是否有菜单图标|Boolean|-|false|
|iconType|菜单图标的类型(目前仅支持字体图标)|String|-|font-icon|
|menuWrapperCss|菜单容器的CSS设置，具体配置参考下表|Object|-|-|
|menuItemCss|菜单项的CSS设置，具体配置参考下表|Object|-|-|
|params|传给处理函数的自定义参数，会注入到下方各回调函数的首个参数中|Any|-|-|
|appendToBody|容器是否挂载到body上|Boolean|-|true|
|disabled|是否禁用整个菜单，接收一个函数|(params: any) => boolean|-|-|
|useLongPressInMobile|移动端下兼容使用长按事件唤出菜单, 但长按模式不支持多级菜单（仅支持指令方式）|Boolean|-|false|
|longPressDuration|长按事件需持续时间,单位ms|Number|-|500|
|injectCloseListener|自动注入关闭菜单的Listener，设为false时需自行处理|Boolean|-|true|

*该插件收录在[howdyjs](https://github.com/leon-kfd/howdyjs)中，为其一个分包，欢迎start*

**Links**
+ [Github](https://github.com/leon-kfd/howdyjs/tree/master/packages/mouse-menu)
+ [Demo](https://leon-kfd.github.io/howdyjs/#/mouse-menu/readme)
