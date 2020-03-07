import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ToTop from "../components/to-top"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="I'm Leon.D" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        // const tags = node.frontmatter.tag.split(',').map((item, index) => {
        //   return (
        //     <small key={index} style={{ margin: `0 0.5rem` }}>{item}</small>
        //   )
        // })
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                {
                  node.frontmatter.outlinkAddress
                    ? (
                      <a style={{ boxShadow: `none` }} href={node.frontmatter.outlinkAddress}
                        target="_blank" rel="noopener noreferrer">
                        {title}
                      </a>
                    ) : (
                      <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                        {title}
                      </Link>
                    )
                }
              </h3>
              <small>{node.frontmatter.date}</small>
              {/* {tags} */}
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
      <ToTop />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            outlinkAddress,
            tag
          }
        }
      }
    }
  }
`
