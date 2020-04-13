import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"
import get from "lodash/get"
import Markdown from "react-markdown"

import Layout from "../components/layout"
import SEO from "../components/seo"
const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const MarkedHeader = styled.h1`
  display: inline;
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
  margin-bottom: 40px;
  text-align: center;
  p {
    margin-bottom: 0;
  }
`
const Next = styled.a`
  margin-left: auto;
`

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export default ({ data }) => {
  const { mdx } = data
  const { body, excerpt, fields, frontmatter } = mdx
  const { description, title, prev, next } = frontmatter
  const { banner, bannerCredit, keywords } = fields

  console.log("frontmatter", frontmatter)
  return (
    <Layout>
      <SEO
        title={title}
        metaImage={get(banner, "childImageSharp.fluid.src")}
        description={description || excerpt}
      />
      <Content>
        <MarkedHeader>{title}</MarkedHeader>
        <HeaderDate>
          {frontmatter.date} - {fields.readingTime.text}
        </HeaderDate>
        {banner && (
          <ImgWrapper>
            <Img
              fluid={banner.childImageSharp.fluid}
              alt={keywords.join(", ")}
            />
            {bannerCredit ? <Markdown>{bannerCredit}</Markdown> : null}
          </ImgWrapper>
        )}
        <MarkdownContent>{body}</MarkdownContent>
        {(next || prev) && (
          <ActionButtons>
            {prev && <a href={prev}>{`<`} Prev</a>}
            {next && <Next href={next}>Next {`>`}</Next>}
          </ActionButtons>
        )}
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
        next
        prev
        date(formatString: "MMMM Do, YYYY")
      }
      fields {
        banner {
          ...bannerImage720
        }
        bannerCredit
        keywords
        readingTime {
          text
        }
      }
    }
  }
`
