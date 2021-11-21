import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

import ToTop from './to-top'
import Theme from './theme'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.2),
          marginBottom: rhythm(1.5),
          marginTop: 0,
          color: 'var(--textLink)',
          position: 'relative'
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
        <Theme />
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
          color: 'var(--textLink)',
          position: 'relative'
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
        <Theme />
      </h3>
    )
  }
  return (
    <div
      style={{
        color: 'var(--textNormal)',
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <ToTop />
      <footer>
        <p style={{
          marginTop: '4.375rem',
          marginBottom: 0
        }}>
          © {new Date().getFullYear()} <Link title="About me" to="/about">Leon.D</Link>
          &nbsp;&nbsp;
          <a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备20011339号</a>
        </p>
      </footer>
    </div>
  )
}

export default Layout
