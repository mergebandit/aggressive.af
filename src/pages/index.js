import React from "react"
import styled from "@emotion/styled"

import stars from "../static/stars.jpg"
import LandingBio from "../components/landing-bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Wrapper = styled.div`
  background-image: url(${stars});
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StarfieldAnimation = React.lazy(() => import("react-starfield-animation"))

const IndexPage = () => {
  const isSsr = typeof window === "undefined"
  return (
    <Wrapper>
      <div style={{ zIndex: 100, flex: 1 }}>
        <Layout>
          <SEO title="Home" keywords={[`Scott Silvi Blog`]} />
          <LandingBio />
        </Layout>
      </div>
      {!isSsr && (
        <React.Suspense fallback={<div />}>
          <StarfieldAnimation
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          />
        </React.Suspense>
      )}
    </Wrapper>
  )
}

export default IndexPage
