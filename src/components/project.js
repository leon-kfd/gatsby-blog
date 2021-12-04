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
  },
  {
    title: 'To Control',
    text: '将元素设置为可拖拽改变位置与大小'
  }
].map(item => {
  let linkText = toKebabCase(item.title)
  item.link = `https://kongfandong.cn/howdy/${linkText}`
  return item
})

const howdzDashboard = [
  {
    title: '网页版 - View Online',
    link: 'https://s.kongfandong.cn'
  },
  {
    title: 'Chrome插件 - Install from store',
    link: 'https://chrome.google.com/webstore/detail/howdz%E8%B5%B7%E5%A7%8B%E9%A1%B5/ggglfehkglgpenacfalffmiojghklamm/related'
  },
  {
    title: 'Edge插件 - Install from store',
    link: 'https://microsoftedge.microsoft.com/addons/detail/howdz%E8%B5%B7%E5%A7%8B%E9%A1%B5/cgcggcdgjfmeoemmdpleinicgepijegd'
  },
  {
    title: '桌面应用 - Download install package',
    link: 'https://github.com/leon-kfd/Dashboard/releases'
  }
]

const howdyLink = [
  {
    name: '⚡Github',
    link: 'https://github.com/leon-kfd/howdyjs/'
  },
  {
    name: '📖Document',
    link: 'https://kongfandong.cn/howdy/'
  },
  {
    name: '💾NPM',
    link: 'https://www.npmjs.com/search?q=%40howdyjs'
  }
]

const dashboardLink = [
  {
    name: '⚡Github',
    link: 'https://github.com/leon-kfd/Dashboard/'
  },
  {
    name: '📖Document',
    link: 'https://howdz.vercel.app'
  },
  {
    name: '🌈Live Demo',
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
            <a style={{ boxShadow: `none` }} href={`https://s.kongfandong.cn`}
              target="_blank" rel="noopener noreferrer" className="home-outlink">
              Howdz 🔸 浏览器起始页
              <svg className="home-outlink-img" viewBox="0 0 1024 1024">
                <path d="M912 1008.512H15.488V112h448.256v96H111.488v704.512H816V560.256h96z"></path>
                <path d="M918.208 37.888l67.904 67.904L545.984 545.92l-67.904-67.84z"></path>
                <path d="M1007.168 310.656h-96V112h-208V16h304z"></path>
              </svg>
            </a>
          </h3>
          <small className="outlink">
            {dashboardLink.map(item => <a href={item.link} target="_blank" rel="noopener noreferrer" key={item.name}>{item.name}</a>)}
          </small>
        </header>
        <section>
          <p style={{marginBottom: 0}}>完全自定义配置的浏览器导航首页面板，支持自定义添加天气、时钟、搜索、收藏等各种物料组件，可编辑删除组件与其各种样式或功能属性。响应式设计，可自定义随机壁纸背景图或动态壁纸。</p>
          <details>
            <summary>安装方式</summary>
            <ul className="howdy-component">
              {
                howdzDashboard.map(item => {
                  return (
                    <li key={item.title} key={item.title}>
                      <a href={item.link} target="_blank">{item.title}</a>
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
            <a style={{ boxShadow: `none` }} href={`https://kongfandong.cn/howdy/`}
              target="_blank" rel="noopener noreferrer" className="home-outlink">
              Howdyjs 🔸 插件库
              <svg className="home-outlink-img" viewBox="0 0 1024 1024">
                <path d="M912 1008.512H15.488V112h448.256v96H111.488v704.512H816V560.256h96z"></path>
                <path d="M918.208 37.888l67.904 67.904L545.984 545.92l-67.904-67.84z"></path>
                <path d="M1007.168 310.656h-96V112h-208V16h304z"></path>
              </svg>
            </a>
          </h3>
          <small className="outlink">
            {howdyLink.map(item => <a href={item.link} target="_blank" rel="noopener noreferrer" key={item.link}>{item.name}</a>)}
          </small>
        </header>
        <section>
          <p style={{marginBottom: 0}}>个人JS插件库，包含自定义拖拽、滚动条、右键菜单、图片放大等原生JS插件和动画模态框、标签页等Vue3组件或指令。</p>
          <details>
            <summary>组件列表</summary>
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
    </div>
  )
}
