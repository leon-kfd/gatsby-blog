import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import SEO from "../components/seo"
import Project from "../components/project"
import Layout from "../components/layout"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="I'm Leon.D" />
      <Bio />
      <Project />
      <div style={{
        marginBottom: '3rem'
      }}>
        <p className="home-title">Article</p>
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
                          target="_blank" rel="noopener noreferrer" className="home-outlink">
                          {title}
                          <svg className="home-outlink-img" viewBox="0 0 1024 1024">
                            <path d="M912 1008.512H15.488V112h448.256v96H111.488v704.512H816V560.256h96z"></path>
                            <path d="M918.208 37.888l67.904 67.904L545.984 545.92l-67.904-67.84z"></path>
                            <path d="M1007.168 310.656h-96V112h-208V16h304z"></path>
                          </svg>
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
      </div>
      
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: { frontmatter: { hidden: {ne: true} } }
    ) {
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
            tag,
            hidden
          }
        }
      }
    }
  }
`
