import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import '../css/about.scss'

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const weightMap = {
    Vue: {
      weight: 9,
      url: 'https://cn.vuejs.org/'
    },
    Jquery: {
      weight: 7,
      url: 'https://www.runoob.com/jquery/jquery-tutorial.html'
    },
    ElementUI: {
      weight: 7,
      url: 'https://element.eleme.cn/#/zh-CN'
    },
    Nodejs: {
      weight: 6,
      url: 'http://nodejs.cn/api/'
    },
    Layui: {
      weight: 4,
      url: 'https://www.layui.com/'
    },
    PHP: {
      weight: 5,
      url: 'https://www.php.net/'
    },
    MySQL: {
      weight: 6,
      url: 'https://www.mysql.com/'
    },
    Nginx: {
      weight: 4,
      url: 'https://www.nginx.cn/doc/'
    },
    Apache: {
      weight: 4,
      url: 'http://httpd.apache.org/docs/2.4/'
    },
    Koa: {
      weight: 5,
      url: 'https://koa.bootcss.com/'
    },
    Eggjs: {
      weight: 6,
      url: 'https://eggjs.org/zh-cn/index.html'
    },
    React: {
      weight: 3,
      url: 'https://react.docschina.org/'
    },
    Rap2: {
      weight: 4,
      url: 'https://github.com/thx/rap2-delos'
    },
    Echart: {
      weight: 4,
      url: 'https://www.echartsjs.com/zh/index.html'
    },
    Canvas: {
      weight: 3,
      url: 'https://www.w3school.com.cn/html5/html5_ref_canvas.asp'
    },
    RegExp: {
      weight: 3,
      url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp'
    },
    Webpack: {
      weight: 5,
      url: 'https://www.webpackjs.com/'
    },
    Fiddler: {
      weight: 2,
      url: 'https://www.telerik.com/fiddler'
    },
    Requirejs: {
      weight: 2,
      url: 'https://requirejs.org/'
    },
    Linux: {
      weight: 4,
      url: 'https://www.linux.org/'
    },
    Nuxtjs: {
      weight: 4,
      url: 'https://zh.nuxtjs.org/'
    },
    Puppeteer: {
      weight: 4,
      url: 'https://pptr.dev/'
    },
    Gatsby: {
      weight: 2,
      url: 'https://www.gatsbyjs.org/'
    },
    Laravel: {
      weight: 5,
      url: 'https://learnku.com/docs/laravel/7.x'
    },
    Git: {
      weight: 4,
      url: 'https://git-scm.com/'
    }
  }
  let tagsList = Object.keys(weightMap).map(key => {
    return { name: key, weight: weightMap[key].weight, size: Math.sqrt(weightMap[key].weight) * 4, url: weightMap[key].url }
  }).sort((a, b) => b.weight - a.weight)
  let tags = tagsList.map(item => {
    return (
      <a href={item.url} target="_blank" style={{ boxShadow: 'none' }} key={item.name}>
        <span className="tags">{item.name}</span>
      </a>
    )
  })

  return (
    <Layout location={location} title={`${siteTitle} | About`}>
      <SEO title="About" />
      <div className="about-bg-box"></div>
      <h1 className="about-title">Hello, I'm Leon.D</h1>
      <div className="about-body">
        <div className="about-base">
          <h3 className="title">Base</h3>
          <section className="content">
            <ul class="base-list">
              <li>🔭 I’m currently working as a Front-end Developer in Guangzhou, China</li>
              <li>🌱 I’m currently learning Typescript, Vite, Threejs</li>
              <li>💬 Ask me about anything related to Javascript, Node, Vue</li>
              <li>📫 How to reach me: <a href="mailto://kfd_personal@163.com">kfd_personal@163.com</a></li>
            </ul>
          </section>
        </div>
        <div className="about-tags">
          <h3 className="title">Tags</h3>
          <section className="content">
            {tags}
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`