/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })

    console.log("frontmatter", node.frontmatter)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    createNodeField({
      name: "keywords",
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: "banner",
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: "bannerCredit",
      node,
      value: node.frontmatter.bannerCredit,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  return graphql(`
    {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              path
              draft
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMdx.edges
      .filter(({ node }) => !node.frontmatter.draft)
      .forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {
            id: node.id,
          },
        })
      })
  })
}
