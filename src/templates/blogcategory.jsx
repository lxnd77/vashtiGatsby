// import Blog from "pages/blog.js";
// import { graphql } from 'gatsby';
// const BlogCategory = ({posts, meta, categories}) => {
//     return(
//     <>
//         <Helmet
//             title={`Categories | Vashti Kalvi`}
//             titleTemplate={`%s | ${meta.title}`}
//             meta={[
//                 {
//                     name: `description`,
//                     content: meta.description,
//                 },
//                 {
//                     property: `og:title`,
//                     content: `Categories | Vashti Kalvi`,
//                 },
//                 {
//                     property: `og:description`,
//                     content: meta.description,
//                 },
//                 {
//                     property: `og:type`,
//                     content: `website`,
//                 },
//                 {
//                     name: `twitter:card`,
//                     content: `summary`,
//                 },
//                 {
//                     name: `twitter:creator`,
//                     content: meta.author,
//                 },
//                 {
//                     name: `twitter:title`,
//                     content: meta.title,
//                 },
//                 {
//                     name: `twitter:description`,
//                     content: meta.description,
//                 },
//             ].concat(meta)}
//         />
//         <Layout>
//             <Blog posts={posts} meta={meta} categories={categories}/>
//         </Layout>
//     </>
//     )
// }
// export default ({ data }) => {
//     const posts = data.prismic.allPosts.edges[0].node;
//     const meta = data.site.siteMetadata;
//     const categories = data.prismic.categs.edges;
//     return (
//         <BlogCategory posts={posts} meta={meta} categories={categories}/>
//     )
// }

// BlogCategory.propTypes = {
//     posts: PropTypes.object.isRequired,
//     meta: PropTypes.object.isRequired,
//     categories: PropTypes.array.isRequired,
// };

// export const query = graphql`
//     query ProjectQuery2($category: String){
//         prismic {
//             allPosts(sortBy: post_date_DESC where: {post_category_fulltext: $category}) {
//                 edges {
//                     node {
//                         post_title
//                         post_hero_image
//                         post_hero_annotation
//                         post_date
//                         post_category
//                         post_body
//                         post_author
//                         post_preview_description
//                         _meta {
//                             uid
//                         }
//                     }
//                 }
//             }
//             categs: allPosts(sortBy: post_category_ASC) {
//                 edges {
//                     node {
//                         post_category
//                     }
//                 }
//             }
//         }
//         site {
//             siteMetadata {
//                 title
//                 description
//                 author
//             }
//         }
//     }
// `