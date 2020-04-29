/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/core"
import { Location } from "@reach/router"
import { MDXProvider } from "@mdx-js/react"

import { Callout } from "./ui"
import mdxComponents from "./mdx"
import Header from "./header"
import "./layout.css"

const shortcodes = { Callout }
const globalStyles = css`
  .highlight-line {
    background-color: rgba(201, 167, 255, 0.2);
    margin: 0 -10px;
    padding: 0 5px;
    border-left: 5px solid rgb(199, 146, 234);
  }
  code {
    padding: 2px 4px;
    background: #f4f3fa;
    border-radius: 3px;
  }
  pre {
    background-color: #061526 !important;
    border-radius: 4px;
    font-size: 16px;
    padding: 10px;
    margin-bottom: 1rem !important;
    overflow-x: auto;
    /* Track */
    ::-webkit-scrollbar {
      width: 100%;
      height: 5px;
      border-radius: 0 0 5px 5px;
    }
    ::-webkit-scrollbar-track {
      background: #061526;
      border-radius: 0 0 4px 4px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
    }
  }
`
const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 0 1.0875rem 1rem;
  padding-top: 0;
`

const GatsbyLink = styled.a`
  margin-left: 5px;
`

const Footer = styled.footer`
  display: flex;
  justify-content: center;

  ${(p) =>
    p.isRoot
      ? `
    color: #fff;
    a {
      color: #fff;
    }
  `
      : ``}
`

const Layout = ({ children, path }) => {
  const components = {
    ...shortcodes,
    ...mdxComponents,
  }
  return (
    <Location>
      {({ location }) => (
        <StaticQuery
          query={graphql`
            query SiteTitleQuery {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={(data) => (
            <>
              <Header siteTitle={data.site.siteMetadata.title} />
              <Global styles={globalStyles} />
              <Content>
                <MDXProvider components={components}>{children}</MDXProvider>
                <Footer
                  isRoot={
                    location.pathname === "/" || location.pathname === "/*"
                  }
                >
                  <p>
                    © {new Date().getFullYear()}, Built with
                    {` `}
                  </p>
                  <GatsbyLink href="https://www.gatsbyjs.org">
                    Gatsby
                  </GatsbyLink>
                </Footer>
              </Content>
            </>
          )}
        />
      )}
    </Location>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
