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

import Header from "./header"
import "./layout.css"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 0 1.0875rem 1rem;
  padding-top: 0;
`

const GatsbyLink = styled.a`
  color: ${(p) => (p.isRoot ? "white" : "black")};
  margin-left: 5px;
`

const Footer = styled.footer`
  color: ${(p) => (p.isRoot ? "white" : "black")};
  display: flex;
  justify-content: center;
`

const Layout = ({ children, path }) => {
  const isRoot =
    typeof window !== "undefined" && window.location.pathname === "/"
  return (
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
            <Footer isRoot={isRoot}>
              <p>
                © {new Date().getFullYear()}, Built with
                {` `}
              </p>
              <GatsbyLink isRoot={isRoot} href="https://www.gatsbyjs.org">
                Gatsby
              </GatsbyLink>
            </Footer>
          </Content>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
