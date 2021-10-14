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
    Nodejs: {
      weight: 6,
      url: 'http://nodejs.cn/api/'
    },
    Vite: {
      weight: 6,
      url: 'https://cn.vitejs.dev/'
    },
    MySQL: {
      weight: 6,
      url: 'https://www.mysql.com/'
    },
    Nginx: {
      weight: 5,
      url: 'https://www.nginx.cn/doc/'
    },
    PHP: {
      weight: 2,
      url: 'https://www.php.net/'
    },
    Apache: {
      weight: 2,
      url: 'http://httpd.apache.org/docs/2.4/'
    },
    Koa: {
      weight: 4,
      url: 'https://koa.bootcss.com/'
    },
    Eggjs: {
      weight: 3,
      url: 'https://eggjs.org/zh-cn/index.html'
    },
    React: {
      weight: 5,
      url: 'https://react.docschina.org/'
    },
    Echart: {
      weight: 4,
      url: 'https://www.echartsjs.com/zh/index.html'
    },
    Canvas: {
      weight: 5,
      url: 'https://www.w3school.com.cn/html5/html5_ref_canvas.asp'
    },
    Webpack: {
      weight: 4,
      url: 'https://www.webpackjs.com/'
    },
    Nuxtjs: {
      weight: 4,
      url: 'https://zh.nuxtjs.org/'
    },
    Puppeteer: {
      weight: 4,
      url: 'https://pptr.dev/'
    },
    Git: {
      weight: 5,
      url: 'https://git-scm.com/'
    },
    Konva: {
      weight: 5,
      url: 'https://konvajs.org/docs/index.html'
    },
    Gatsby: {
      weight: 2,
      url: 'https://www.gatsbyjs.org/'
    },
    Taro: {
      weight: 4,
      url: 'https://taro-docs.jd.com/taro/docs/README'
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
