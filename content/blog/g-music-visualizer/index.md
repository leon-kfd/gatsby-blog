---
title: "利用G渲染器实现的音频可视化方案"
date: "2021-06-29"
description: "利用阿里Antvis出品的G底层图形渲染器，结合AudioContext提供的音频数据获取Api，实现出类似网易云播放音频特效。"
tag: "Personal"
---

利用阿里Antvis出品的G底层图形渲染器，结合AudioContext提供的音频数据获取API，实现出类似网易云播放音频特效。

项目地址：
+ <a href="https://github.com/leon-kfd/g-music-visualizer" target="_blank">⚡Github</a>
+ <a href="https://leon-kfd.github.io/g-music-visualizer/" target="_blank">💡Demo</a>

## 关于G渲染器

`G`是一款易用、高效、强大的 2D 可视化渲染引擎，提供 Canvas、SVG 等多种渲染方式的实现。目前，已有多个顶级的可视化开源项目基于`G`开发，比如图形语法库`G2`、图可视化库`G6`等。

作为一个底层渲染器，其内置了许多常用的内置图形，提供完整的DOM事件模拟，同时提供了流程的动画实现，这些特性对我们这次实现音频特效都是很有必要的。

目前与`G`相似的竞品还有`Echart`的`ZRender`，相比较以我个人看法来说，Zrender提供的API更丰富，但是上手难度比G要高一点，而`G`的API相对`简洁`一点。

类似的还有老大哥`d3`，这个相较以上两个更底层，API更丰富，但上手难度就更大了。同时`g`里面的一些方法好像也是参考了`d3`算法思路。

`G`[文档](https://g.antv.vision/zh/docs/api/canvas) *（这里吐槽说一下，G的文档还有很大优化空间，实在太简洁了，很多API都是一笔带过，用法也不怎么说明）*

## AudioContext读取音频数据

实现音频特效动画的前提是需要拿到一个音频的音频数据，浏览网上一些方案后，发现[AudioContext](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext)含有相关的API。

原理：
+ 首先需要基于`AudioContext.createAnalyser()`创建一个`Analyser`
+ 为`Analyser`关联音频源，目前常用的音频源方式一般为以下两个
  + `AudioContext.createMediaElementSource()`: 关联到`audio`或`video`标签中（当前方案选择了这个）
  + `AudioContext.createMediaStreamSource()`: 关联到本地计算机或网络音频媒体流对象
+ 创建`Gain`音量节点并关联到`Analyser`的`destination`中
+ 通过`AnalyserNode.getByteFrequencyData()`方法将当前频率数据复制到传入的最终需读取音频的Uint8Array中

把以上操作封装到一个类中，便于初始化，可参考以下代码:

```ts
// src/plugins/MusicVisualizer.ts
const _analyser = new window.AudioContext();

type MusicVisualizerOptions = {
	audioEl?: HTMLAudioElement;
	size?: number;
}
export class MusicVisualizer {
	private analyser: AnalyserNode;
	private gainNode: GainNode;
	private audioSource?: MediaElementAudioSourceNode;
	private options: MusicVisualizerOptions & {
		size: number
	};
	private visualArr: Uint8Array;
	constructor (options?: MusicVisualizerOptions) {
		const defaultOptions = {
			size: 128
		}
		this.options = {
			...defaultOptions,
			...options
		}
		this.analyser = _analyser.createAnalyser();
		this.analyser.fftSize = this.options.size * 2;
		this.gainNode = _analyser.createGain();
		this.gainNode.connect(_analyser.destination);
		this.analyser.connect(this.gainNode);
		if (this.options.audioEl) {
			this.audioSource = _analyser.createMediaElementSource(this.options.audioEl)
			this.audioSource.connect(this.analyser)
		}
		this.visualArr = new Uint8Array(this.analyser.frequencyBinCount);
		this.resumeAudioContext();
	}

  // 新版Chrome Audio需要有交互行为后才可以利用JS执行播放
	private resumeAudioContext () {
		if (_analyser) {
			const resumeAudio = () => {
				if (_analyser.state === 'suspended') _analyser.resume();
				document.removeEventListener('click', resumeAudio)
			}
			document.addEventListener('click', resumeAudio)
		}
	}

  // 更换Audio
  setAudioEl(el: HTMLAudioElement) {
		if (this.audioSource) {
			this.audioSource.disconnect(this.analyser)
		}
		this.audioSource = _analyser.createMediaElementSource(el)
		this.audioSource.connect(this.analyser)
	}

  // 获取音频频域数据
	getVisualizeValue () {
		this.analyser.getByteFrequencyData(this.visualArr)
		return this.visualArr;
	}

	// 更改音量
	changeVolumn (value: number) {
		this.gainNode.gain.value = value
	}

  // 卸载
	destory() {
		this.analyser.disconnect(this.gainNode);
		this.audioSource?.disconnect(this.analyser)
		this.gainNode.disconnect(_analyser.destination);
	}
}
```

初始化之后，就可以监听Audio的播放事件，当播放时利用`getVisualizeValue()`方法获取到实时音频（可结合利用requestAnimationFrame或setTimeout获取），这里因为是做可视化动画，当然是利用`requestAnimationFrame`读取每帧的数据后渲染。

还有一个需要注意的点，当Audio的数据源是网络音频时，有可能会出现无法读取到音频数据的问题。这个问题一般可能是因为网络音频的跨域限制，需要为Audio标签加入`crossOrigin="anonymous"`属性。
一般的CDN资源是很少设置AccessHeader跨域限制的，但加入这个属性后仍然出现了跨域的报错，说明这网络路径是设置了跨域限制的，这时候可以考虑用Nginx反向代理或服务端解决。
```html
<audio controls onPlay={play} onPause={pause} ref={audio} src={audioURL} crossOrigin="anonymous"></audio>
```

## 可视化特效实现

**以下选取项目部分功能的实现原理进行说明**

### 专辑图片旋转动画

// todo

### 在圆上的点

// todo

### 使用Path绘制圆形

// todo

### 通过点形成平滑曲线

// todo

### 粒子特效的实现

// todo

## 其他说明

这个项目是一个练手项目，基于`vite`、`React`、`Typescript`，因为react平时用的不多，项目中存在什么问题或写的不好的地方欢迎指点。

或者有什么好看的特效也可以提ISSUE或PR交流一下怎么实现。

项目Github: <a href="https://github.com/leon-kfd/g-music-visualizer" target="_blank">Click Here</a>

项目Demo: <a href="https://leon-kfd.github.io/g-music-visualizer/" target="_blank">Click Here</a>

