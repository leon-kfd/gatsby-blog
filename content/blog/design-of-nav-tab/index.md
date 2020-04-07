---
title: "浏览器导航首页设计"
date: "2020-03-29"
description: "一个浏览器首页站点, 包含可切换的常用搜索引擎搜索功能, 键盘布局添加快捷收藏网站, 并加入键盘按键监听可快速打开, 自定义背景图, 账号同步数据等功能"
tag: "Personal"
hidden: false
---

一个浏览器首页站点, 包含可切换的常用搜索引擎搜索功能, 键盘布局添加快捷收藏网站, 并加入键盘按键监听可快速打开, 自定义背景图, 账号同步数据等功能

系统半成品已部署与线上，在线访问：<a href="http://s.kongfandong.cn" target="_blank">http://s.kongfandong.cn</a>

### 搜索引擎切换功能

该功能时为了便于让用户可快速切换不同的搜索引擎，可以涉及不同领域的搜索，例如常用引擎、视频、翻译等搜索。在搜索框聚焦状态下按Tab键就可按用户规定的顺序快速切换引擎（Shift + Tab向上切换）。
```js
handleInputKeyDown (e) {
  if (e.keyCode === 9) {
    if (e.shiftKey) {
      this.activeEngine = this.activeEngine <= 0 ? this.$store.state.engineList.length - 1 : --this.activeEngine
      e.preventDefault()
    } else {
      this.activeEngine = this.activeEngine >= this.$store.state.engineList.length - 1 ? 0 : ++this.activeEngine
      e.preventDefault()
    }
  }
  if (e.keyCode === 13) {
    window.open(this.$store.state.engineList[this.activeEngine].link + encodeURIComponent(this.searchKey))
  }
}
```

寻找目前主流搜索引擎关键字拼接规则记录列表和寻找Icon保存到VUEX中，目前设置了默认引擎为Bing国内、国外、百度，然后备用设置了Google、搜狗、Bilibili、淘宝等。用户可以在设置页通过拖拽切换引擎顺序与添加备用搜索到当前。

拖拽功能使用vuedragable实现，将当前引擎与备用引擎设为同一个group，即可让两者可以互相拖拽，并且通过pull设置实现当engineList长度为1是不可再向外拖出。
```html{4, 22}
...
<div class="text">当前引擎组</div>
<draggable :list="engineList"
            :group="{ name: 'engine',pull: engineList.length > 1 }"
            @end="handleDragEnd">
  <transition-group type="transition"
                    name="flip-list"
                    class="now-engine-list engine-list">
    <div class="engine-list-item"
          v-for="item in engineList"
          :key="item.name">
      <img :src="item.iconPath"
            alt="icon"
            width="24"
            height="24">
      <div class="text">{{item.name}}</div>
    </div>
  </transition-group>
</draggable>
<div class="text">备用引擎组</div>
<draggable :list="backupEngineList"
            group="engine"
            @end="handleDragEnd">
  <transition-group type="transition"
                    name="flip-list"
                    class="backupEngineList engine-list">
    <div class="engine-list-item"
          v-for="item in backupEngineList"
          :key="item.name">
      <img :src="item.iconPath"
            alt="icon"
            width="24"
            height="24">
      <div class="text">{{item.name}}</div>
    </div>
  </transition-group>
</draggable>
...
```

### 键盘收藏夹功能

用户可通过点击模拟键盘按键快速跳转到收藏好的网站，未设置时点击则弹窗让用户添加。

主要功能实现：
1. 截取用户输入的http地址中的域名，然后通过“域名 + /favicon.ico”获取主流网站的Icon，当获取不到时，使用截取Title的首字符作为Icon。
2. 使用Flex布局实现模拟键盘布局
3. 监听按键添加事件，window.open打开用户收藏的网站
4. 使用自建组件<a href="http://kongfandong.cn/pratice/animation-dialog" target="_blank">Animation Dialog</a>实现弹窗(Where open where close交互)

