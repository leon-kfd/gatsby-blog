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
        {/* <div className="tags" onMouseLeave={(e) => hanldeTagsMouseLeave(e)}>
          <div className="top" onMouseEnter={(e) => handleEnter('Top', e)}></div>
          <div className="right" onMouseEnter={(e) => handleEnter('Right', e)}></div>
          <div className="bottom" onMouseEnter={(e) => handleEnter('Bottom', e)}></div>
          <div className="left" onMouseEnter={(e) => handleEnter('Left', e)}></div>
          <div className="mask"></div>
          <span className="text">{item.name}</span>
        </div> */}
      </a>
    )
  })

  // let flag = false
  // const handleEnter = (direction, e) => {
  //   const { currentTarget } = e
  //   const tag = currentTarget.parentNode
  //   const mask = tag.querySelector('.mask')
  //   const text = tag.querySelector('.text')
  //   if (!flag) {
  //     flag = true
  //     text.style.color = `#ffffff`
  //     mask.style.animationName = `slideFrom${direction}`
  //   }
  // }
  // const hanldeTagsMouseLeave = (e) => {
  //   flag = false
  //   const { currentTarget, clientX: x, clientY: y } = e
  //   const { top, left, width, height } = currentTarget.getBoundingClientRect()
  //   const maxX = left + width
  //   const maxY = top + height
  //   const mask = currentTarget.querySelector('.mask')
  //   const text = currentTarget.querySelector('.text')
  //   text.style.color = `inherit`
  //   if (x >= left && x <= maxX && y < top) {
  //     mask.style.animationName = 'slideOutTop'
  //   } else if (x <= left && y >= top && y <= maxY) {
  //     mask.style.animationName = 'slideOutLeft'
  //   } else if (x >= left && x <= maxX && y >= maxY) {
  //     mask.style.animationName = 'slideOutBottom'
  //   } else if (x >= maxX && y >= top && y <= maxY) {
  //     mask.style.animationName = 'slideOutRight'
  //   } else {
  //     mask.style.animationName = 'slideOutTop'
  //     console.log('error')
  //   }
  // }

  return (
    <Layout location={location} title={`${siteTitle} | About`}>
      <SEO title="About" />
      <div className="about-bg-box"></div>
      <h1 className="about-title">Hello, I'm Leon.D</h1>
      <div className="about-body">
        <div className="about-base">
          <h3 className="title">Base</h3>
          <section className="content">
            <div className="row">
              <svg viewBox="0 0 1024 1024" className="icon">
                <path d="M644.8 581.568l160.64 187.456A64 64 0 0 1 756.842667 874.666667H267.157333a64 64 0 0 1-48.597333-105.642667l160.661333-187.434667c18.922667 11.52 39.466667 20.629333 61.205334 26.944L267.157333 810.666667H480v-128h64v128h212.842667l-173.269334-202.133334a254.613333 254.613333 0 0 0 61.226667-26.965333zM512 149.333333c117.824 0 213.333333 95.509333 213.333333 213.333334s-95.509333 213.333333-213.333333 213.333333-213.333333-95.509333-213.333333-213.333333S394.176 149.333333 512 149.333333z m0 64a149.333333 149.333333 0 1 0 0 298.666667 149.333333 149.333333 0 0 0 0-298.666667z" ></path>
              </svg>
              <div className="text">Leon.D | 孔</div>
            </div>
            <div className="row">
              <svg viewBox="0 0 1024 1024" className="icon">
                <path d="M874.666667 375.189333V746.666667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V375.189333l64 54.250667V746.666667h597.333334V429.44l64-54.250667zM810.666667 213.333333a64.789333 64.789333 0 0 1 22.826666 4.181334 63.616 63.616 0 0 1 26.794667 19.413333 64.32 64.32 0 0 1 9.344 15.466667c2.773333 6.570667 4.48 13.696 4.906667 21.184L874.666667 277.333333v21.333334L553.536 572.586667a64 64 0 0 1-79.893333 2.538666l-3.178667-2.56L149.333333 298.666667v-21.333334a63.786667 63.786667 0 0 1 35.136-57.130666A63.872 63.872 0 0 1 213.333333 213.333333h597.333334z m-9.6 64h-578.133334L512 523.882667 801.066667 277.333333z"></path>
              </svg>
              <div className="text">kfd_personal@163.com</div>
            </div>
            <div className="row">
              <svg className="icon" viewBox="0 0 1024 1024">
                <path d="M539.242667 162.154667l277.333333 130.517333A64 64 0 0 1 853.333333 350.570667v79.850666h-60.245333V671.36H853.333333v116.693333a64 64 0 0 1-64 64H234.666667a64 64 0 0 1-64-64v-116.693333h60.224V430.421333H170.666667v-79.850666a64 64 0 0 1 36.757333-57.898667l277.333333-130.517333a64 64 0 0 1 54.485334 0zM789.333333 735.381333H234.666667v52.693334h554.666666v-52.693334zM391.530667 430.421333h-96.64v240.746667h96.618666V430.421333z m64 0l-0.021334 240.746667h116.714667V430.421333h-116.693333zM512 220.074667l-277.333333 130.496v15.850666h554.666666v-15.850666l-277.333333-130.496z m124.224 451.093333h92.864V430.421333h-92.842667l-0.021333 240.746667z"></path>
              </svg>
              <div className="text">广东技术师范大学 2015~2019</div>
            </div>
            <div className="row">
              <svg className="icon" viewBox="0 0 1024 1024">
                <path d="M874.666667 170.666667v64h-42.666667v426.666666c0 35.349333-30.72 64-68.565333 64h-149.354667l113.749333 128h-85.632l-113.770666-128h-11.562667l-113.749333 128h-85.610667l113.728-128h-170.666667C222.72 725.333333 192 696.682667 192 661.333333V234.666667H149.333333V170.666667h725.333334z m-106.666667 64H256v426.666666h512V234.666667zM405.333333 469.333333v64h-64v-64h64z m277.333334 0v64H448v-64h234.666667z m0-106.666666v64H448v-64h234.666667z m-277.333334 0v64h-64v-64h64z"></path>
              </svg>
              <div className="text">信息管理与信息系统</div>
            </div>
            <div className="row">
              <svg viewBox="0 0 1024 1024" className="icon">
                <path d="M512 128c164.949333 0 298.666667 129.941333 298.666667 290.261333 0 3.392-0.064 6.784-0.213334 10.24-3.669333 95.914667-58.24 203.776-147.797333 313.173334a1260.714667 1260.714667 0 0 1-139.818667 144.768l-10.837333 9.322666-10.837333-9.322666-13.013334-11.626667a1260.714667 1260.714667 0 0 1-126.805333-133.162667c-89.557333-109.376-144.128-217.237333-147.818667-313.173333-0.128-3.413333-0.192-6.826667-0.192-10.24 0-158.08 130.069333-286.677333 291.904-290.176L512 128z m0 64c-130.005333 0-234.666667 101.717333-234.666667 226.261333 0 2.56 0.042667 5.141333 0.149334 7.765334 2.944 76.608 48.554667 171.52 133.376 275.093333a1184.682667 1184.682667 0 0 0 86.613333 94.506667l14.528 14.016 14.506667-14.016a1184.682667 1184.682667 0 0 0 86.634666-94.506667c84.821333-103.573333 130.432-198.485333 133.376-275.093333 0.106667-2.624 0.149333-5.205333 0.149334-7.765334C746.666667 293.717333 642.005333 192 512 192z m0 74.666667a149.333333 149.333333 0 1 1 0 298.666666 149.333333 149.333333 0 0 1 0-298.666666z m0 64a85.333333 85.333333 0 1 0 0 170.666666 85.333333 85.333333 0 0 0 0-170.666666z"></path>
              </svg>
              <div className="text">广州</div>
            </div>
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