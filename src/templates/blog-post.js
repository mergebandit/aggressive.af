import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"
import get from "lodash/get"

import Layout from "../components/layout"
import SEO from "../components/seo"
const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const MarkedHeader = styled.h1`
  display: inline;
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 100%,
    rgba(255, 250, 150, 0.25)
  );
`

const HeaderDate = styled.h3`
  margin-top: 10px;
  color: #606060;
`

// STYLE THE TAGS INSIDE THE MARKDOWN HERE
const MarkdownContent = styled(MDXRenderer)`
  a {
    text-decoration: none;
    position: relative;

    background-image: linear-gradient(
      rgba(255, 250, 150, 0.8),
      rgba(255, 250, 150, 0.8)
    );
    background-repeat: no-repeat;
    background-size: 100% 0.2em;
    background-position: 0 88%;
    transition: background-size 0.25s ease-in;
    &:hover {
      background-size: 100% 88%;
    }
  }
`

const ImgWrapper = styled.div`
  text-align: center;
  p {
    margin-bottom: 0;
  }
`

export default ({ data }) => {
  const { mdx } = data
  const { body, excerpt, fields, frontmatter } = mdx
  const { description, title } = frontmatter
  const { banner, bannerCredit, keywords } = fields

  return (
    <Layout>
      <SEO
        title={title}
        metaImage={get(banner, "childImageSharp.fluid.src")}
        description={description || excerpt}
      />
      <Content>
        <MarkedHeader>{title}</MarkedHeader>
        {banner && (
          <ImgWrapper>
            <Img
              fluid={banner.childImageSharp.fluid}
              alt={keywords.join(", ")}
            />
            {bannerCredit ? (
              <MarkdownContent>{bannerCredit}</MarkdownContent>
            ) : null}
          </ImgWrapper>
        )}
        <HeaderDate>
          {frontmatter.date} - {fields.readingTime.text}
        </HeaderDate>
        <MarkdownContent>{body}</MarkdownContent>
      </Content>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      body
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
      fields {
        banner {
          ...bannerImage260
        }
        keywords
        readingTime {
          text
        }
      }
    }
  }
`
