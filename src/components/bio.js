/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author,
          email,
          position,
          github
        }
      }
    }
  `)

  const { author, email, github, position } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2),
      }}
    >
      <Link style={{ boxShadow: `none`, height: 50 }} to={`about`} title="About me">
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      </Link>
      <p style={{ marginBottom: '0.875rem', overflow: 'hidden' }}>
        A personal blog of <Link to="about" title="About me"><strong>{author}</strong></Link>, {position}.
        <br></br>
        <a href={`mailto:${email}`} style={{ color: 'var(--textGrey)', boxShadow: 'none', display: 'inline-block' }}>{email}</a>
        <span style={{ margin: '0 0.4rem' }}>|</span>
        <a href={github} style={{ color: 'var(--textGrey)', boxShadow: 'none', display: 'inline-block' }} target="_blank">Github</a>
      </p>
    </div>
  )
}

export default Bio
