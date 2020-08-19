---
title: "使用D3.js将离散的点形成平滑曲线"
date: "2020-08-16"
description: "D3.js内置了几种可以将离散点连成线的算法，但官方并没有提供效果展示，于是编写了一个简单的可以快速看到各种连线算法的效果图的DEMO"
tag: "Personal"
---

## 前言

之前遇到了一个场景，需要将多个离散的点使用一条平滑的曲线连起来。在网上找了很多方案，一般都是说使用**`三次样条插值`**实现。自己参考网上算法写了下，发现效果不太理想。然后看到D3js官方原来直接内置了多种相关算法，但官方并没有提供效果展示，于是就编写了一个简单的可以快速看到各种连线算法的效果图的DEMO。

## Demo

Demo访问地址: <a href="https://kongfandong.cn/demo/d3-multipoint-connection/index.html" target="_blank">https://kongfandong.cn/demo/d3-multipoint-connection/index.html</a>

*PS:当前暂不支持移动端*

<iframe src="https://kongfandong.cn/demo/d3-multipoint-connection/index.html" width="100%" height="750px" style="border: none;outline:none;box-shadow: 0 0 5px #888"></iframe>

+ LineType：切换不同的D3内置的连线类型
+ Add Random Point: 你可以添加更多的点进行连线
+ 各个点可以拖拽更改当前位置
+ 部分连线算法可以修改系数参数(bundle、cardinal、catmullRom)

官方文档：<a href="https://d3js.org.cn/document/d3-shape/#curves" target="_blank">https://d3js.org.cn/document/d3-shape/#curves</a>

## 总结

当前使用svg画图，然后用path将各个点连起来。离散点连成一条平滑的曲线，主要是通过贝塞尔曲线实现，通过D3js内置的几种曲线算法可以生成一个插值曲线，然后赋值给path的d属性。若要研究各种曲线算法的原理请参考官方源码。