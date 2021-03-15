import React from 'react'
import { rhythm } from "../utils/typography"
import { toKebabCase } from "../utils/helper"

const howdyComponent = [
  {
    title: 'Animation Dialog',
    text: '使用动画打开模态框'
  },
  {
    title: 'Resize',
    text: '为HTML盒子加入拖拽更改大小功能'
  },
  {
    title: 'Scroll',
    text: '为HTML盒子加入自定义滚动条'
  },
  {
    title: 'Size Observer',
    text: '监听盒子大小变化'
  },
  {
    title: 'Img Zoom',
    text: '为Img标签加入图片放大功能，支持按组浏览下一张图片'
  },
  {
    title: 'To Drag',
    text: '为Fixed定位的元素加入可拖拽功能'
  },
  {
    title: 'Standard Tabs',
    text: '移动端标签页'
  },
  {
    title: 'Mouse Menu',
    text: '自定义右键菜单'
  }
].map(item => {
  let linkText = toKebabCase(item.title)
  item.link = `https://kongfandong.cn/howdy/${linkText}`
  return item
})

const howdyLink = [
  {
    name: '⚡Github',
    link: 'https://github.com/leon-kfd/howdyjs'
  },
  {
    name: '💾NPM',
    link: 'https://www.npmjs.com/search?q=%40howdyjs'
  },
  {
    name: '📖Document',
    link: 'https://kongfandong.cn/howdy'
  }
]

const browserNavLink = [
  {
    name: '⚡Github',
    link: 'https://github.com/leon-kfd/NavTabSystem'
  },
  {
    name: '💡Demo',
    link: 'https://s.kongfandong.cn'
  }
]

export default () => {
  return (
    <div style={{
      marginBottom: '3rem'
    }}>
      <p className="home-title">Project</p>
      <article className="home-article">
        <header>
          <h3
            style={{
              marginBottom: rhythm(1 / 4),
            }}>
            <a style={{ boxShadow: `none` }} href={`https://kongfandong.cn/howdy`}
              target="_blank" rel="noopener noreferrer" className="home-outlink">
              Howdyjs 🔸 组件库
              <svg className="home-outlink-img" viewBox="0 0 1024 1024">
                <path d="M912 1008.512H15.488V112h448.256v96H111.488v704.512H816V560.256h96z"></path>
                <path d="M918.208 37.888l67.904 67.904L545.984 545.92l-67.904-67.84z"></path>
                <path d="M1007.168 310.656h-96V112h-208V16h304z"></path>
              </svg>
            </a>
          </h3>
          <small className="outlink">
            {howdyLink.map(item => <a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>)}
          </small>
        </header>
        <section>
          <p style={{marginBottom: 0}}>个人VUE组件与指令库，包含动画模态框、标签页、表格等组件与自定义拖拽、滚动条、右键菜单、图片放大等指令。</p>
          <details>
            <summary>预览组件</summary>
            <ul className="howdy-component">
              {
              howdyComponent.map(item => {
                return (
                  <li key={item.title}>
                    <a href={item.link} target="_blank">{item.title}</a>
                    <p>{item.text}</p>
                  </li>
                )
              })
              }
            </ul>
          </details>
        </section>
      </article>

      <article className="home-article">
        <header>
          <h3
            style={{
              marginBottom: rhythm(1 / 4),
            }}>
            <a style={{ boxShadow: `none` }} href={`https://s.kongfandong.cn`}
              target="_blank" rel="noopener noreferrer" className="home-outlink">
              Browser Navigation 🔸 浏览器起始页
              <svg className="home-outlink-img" viewBox="0 0 1024 1024">
                <path d="M912 1008.512H15.488V112h448.256v96H111.488v704.512H816V560.256h96z"></path>
                <path d="M918.208 37.888l67.904 67.904L545.984 545.92l-67.904-67.84z"></path>
                <path d="M1007.168 310.656h-96V112h-208V16h304z"></path>
              </svg>
            </a>
          </h3>
          <small className="outlink">
            {browserNavLink.map(item => <a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>)}
          </small>
        </header>
        <section>
          <p>个性化的浏览器导航首页网站，包含自定义切换搜索引擎、键盘收藏夹、每日图片、配置同步等功能，后续会使用Vue3迭代。</p>
        </section>
      </article>
    </div>
  )
}
