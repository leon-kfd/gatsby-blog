(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{RXBc:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),l=a.n(n),r=a("Wbzz"),o=a("6Gk8"),m=a("vrFN"),c=a("p3AD"),i=a("yWgo"),s=[{title:"Animation Dialog",text:"使用动画打开模态框"},{title:"Resize",text:"为HTML盒子加入拖拽更改大小功能"},{title:"Scroll",text:"为HTML盒子加入自定义滚动条"},{title:"Size Observer",text:"监听盒子大小变化"},{title:"Img Zoom",text:"为Img标签加入图片放大功能，支持按组浏览下一张图片"},{title:"To Drag",text:"为Fixed定位的元素加入可拖拽功能"},{title:"Standard Tabs",text:"移动端标签页"},{title:"Mouse Menu",text:"自定义右键菜单"},{title:"To Control",text:"将元素设置为可拖拽改变位置与大小"}].map((function(e){var t=Object(i.b)(e.title);return e.link="https://kongfandong.cn/howdy/"+t,e})),h=[{name:"⚡Github",link:"https://github.com/leon-kfd/howdyjs/"},{name:"💾NPM",link:"https://www.npmjs.com/search?q=%40howdyjs"},{name:"📖Document",link:"https://kongfandong.cn/howdy/"}],d=[{name:"⚡Github",link:"https://github.com/leon-kfd/Dashboard/"},{name:"💡Demo",link:"https://s.kongfandong.cn"}],u=function(){return l.a.createElement("div",{style:{marginBottom:"3rem"}},l.a.createElement("p",{className:"home-title"},"Project"),l.a.createElement("article",{className:"home-article"},l.a.createElement("header",null,l.a.createElement("h3",{style:{marginBottom:Object(c.a)(1/4)}},l.a.createElement("a",{style:{boxShadow:"none"},href:"https://kongfandong.cn/howdy/",target:"_blank",rel:"noopener noreferrer",className:"home-outlink"},"Howdyjs 🔸 插件库",l.a.createElement("svg",{className:"home-outlink-img",viewBox:"0 0 1024 1024"},l.a.createElement("path",{d:"M912 1008.512H15.488V112h448.256v96H111.488v704.512H816V560.256h96z"}),l.a.createElement("path",{d:"M918.208 37.888l67.904 67.904L545.984 545.92l-67.904-67.84z"}),l.a.createElement("path",{d:"M1007.168 310.656h-96V112h-208V16h304z"})))),l.a.createElement("small",{className:"outlink"},h.map((function(e){return l.a.createElement("a",{href:e.link,target:"_blank",rel:"noopener noreferrer"},e.name)})))),l.a.createElement("section",null,l.a.createElement("p",{style:{marginBottom:0}},"个人JS插件库，包含自定义拖拽、滚动条、右键菜单、图片放大等原生JS插件和动画模态框、标签页等Vue3组件或指令。"),l.a.createElement("details",null,l.a.createElement("summary",null,"预览组件"),l.a.createElement("ul",{className:"howdy-component"},s.map((function(e){return l.a.createElement("li",{key:e.title},l.a.createElement("a",{href:e.link,target:"_blank"},e.title),l.a.createElement("p",null,e.text))})))))),l.a.createElement("article",{className:"home-article"},l.a.createElement("header",null,l.a.createElement("h3",{style:{marginBottom:Object(c.a)(1/4)}},l.a.createElement("a",{style:{boxShadow:"none"},href:"https://s.kongfandong.cn",target:"_blank",rel:"noopener noreferrer",className:"home-outlink"},"Howdz 🔸 浏览器起始页",l.a.createElement("svg",{className:"home-outlink-img",viewBox:"0 0 1024 1024"},l.a.createElement("path",{d:"M912 1008.512H15.488V112h448.256v96H111.488v704.512H816V560.256h96z"}),l.a.createElement("path",{d:"M918.208 37.888l67.904 67.904L545.984 545.92l-67.904-67.84z"}),l.a.createElement("path",{d:"M1007.168 310.656h-96V112h-208V16h304z"})))),l.a.createElement("small",{className:"outlink"},d.map((function(e){return l.a.createElement("a",{href:e.link,target:"_blank",rel:"noopener noreferrer"},e.name)})))),l.a.createElement("section",null,l.a.createElement("p",null,"个性化的浏览器导航首页面板，支持自定义添加组件，可编辑组件各种属性。响应式设计，可自定义随机壁纸背景图，目前支持时钟、天气、搜索栏、TodoList等组件。"))))},E=a("Bl7J");t.default=function(e){var t=e.data,a=e.location,n=t.site.siteMetadata.title,i=t.allMarkdownRemark.edges;return l.a.createElement(E.a,{location:a,title:n},l.a.createElement(m.a,{title:"I'm Leon.D"}),l.a.createElement(o.a,null),l.a.createElement(u,null),l.a.createElement("div",{style:{marginBottom:"3rem"}},l.a.createElement("p",{className:"home-title"},"Article"),i.map((function(e){var t=e.node,a=t.frontmatter.title||t.fields.slug;return l.a.createElement("article",{key:t.fields.slug},l.a.createElement("header",null,l.a.createElement("h3",{style:{marginBottom:Object(c.a)(1/4)}},t.frontmatter.outlinkAddress?l.a.createElement("a",{style:{boxShadow:"none"},href:t.frontmatter.outlinkAddress,target:"_blank",rel:"noopener noreferrer",className:"home-outlink"},a,l.a.createElement("svg",{className:"home-outlink-img",viewBox:"0 0 1024 1024"},l.a.createElement("path",{d:"M912 1008.512H15.488V112h448.256v96H111.488v704.512H816V560.256h96z"}),l.a.createElement("path",{d:"M918.208 37.888l67.904 67.904L545.984 545.92l-67.904-67.84z"}),l.a.createElement("path",{d:"M1007.168 310.656h-96V112h-208V16h304z"}))):l.a.createElement(r.Link,{style:{boxShadow:"none"},to:t.fields.slug},a)),l.a.createElement("small",null,t.frontmatter.date)),l.a.createElement("section",null,l.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.frontmatter.description||t.excerpt}})))}))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-ceba015ff19569c57f6c.js.map