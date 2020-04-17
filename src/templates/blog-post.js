import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import { ImgZoom } from '../utils/img-zoom'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext


  useEffect(() => {
    Array.from(document.querySelectorAll('img.gatsby-resp-image-image')).map(item => {
      const srcset = item.srcset && item.srcset.split(',')
      let imgSrc
      if (srcset.length > 0) {
        let str = srcset[srcset.length - 1]
        imgSrc = str.split(' ')[0]
      }
      if (!item.$imgZoom) {
        new ImgZoom({
          el: item,
          options: {
            imgSrc,
            title: item.getAttribute('alt'),
            group: post.frontmatter.title,
            zoomCursor: true,
            showCloseBtn: true,
            preventDefault: true
          }
        })
      }
    })
    return () => {
      Array.from(document.querySelectorAll('img.gatsby-resp-image-image')).map(item => {
        item.$imgZoom && item.$imgZoom.destory()
      })
    }
  })


  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
