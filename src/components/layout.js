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
import { Location } from "@reach/router"

import Header from "./header"
import "./layout.css"

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
              <Content>
                <main>{children}</main>
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
