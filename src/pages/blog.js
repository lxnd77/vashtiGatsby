import React, {useState} from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql  } from "gatsby";
import Button from "components/_ui/Button";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";
import Layout from "components/Layout";
import { Flex } from "rebass";
import PostCard from "components/PostCard";

const BlogTitle = styled("h1")`
    margin-bottom: 1em;
`

const BlogGrid = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2.5em;

    @media(max-width: 1050px) {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-template-columns: 1fr;
        grid-gap: 2.5em;
    }
`



const Blog = ({ posts, meta, categories }) => {
    
    
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const onCategoryClick = (category) => {
        console.log(category);
        let f = posts.filter((post) => {
            return post.node.post_category[0].text.includes(category);
        });
        console.log(f);
        setFilteredPosts(f);
    }

    return(
    <>
        <Helmet
            title={`Blog | Vashti Kalvi`}
            titleTemplate={`%s | Blog | Vashti Kalvi`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Blog | Vashti Kalvi`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Layout>
            <BlogTitle>
                Blog
            </BlogTitle>
            <Flex>
                {categories.map((category,i) => (
                    <Button
                    key={i}
                    onClick={()=>onCategoryClick(category.node.post_category[0].text)}>
                        {category.node.post_category[0].text}    
                    </Button>
                        
                ))}
                <Button 
                onClick={()=>onCategoryClick("")}>
                    All
                </Button>
                
            </Flex>
            <BlogGrid>
                {filteredPosts.map((post, i) => (
                    <PostCard
                        key={i}
                        author={post.node.post_author}
                        category={post.node.post_category}
                        title={post.node.post_title}
                        date={post.node.post_date}
                        description={post.node.post_preview_description}
                        uid={post.node._meta.uid}
                    />
                ))}
            </BlogGrid>
        </Layout>
        </>
    );

}

export default ({ data }) => {
    const posts = data.prismic.allPosts.edges;
    const meta = data.site.siteMetadata;
    const categories = data.prismic.categs.edges;
    if (!posts) return null;
    if (!categories) return null;

    return (
        <Blog posts={posts} meta={meta} categories={categories} />
    )
}

Blog.propTypes = {
    posts: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
};


export const query = graphql`
    {
        prismic {
            allPosts(sortBy: post_date_DESC) {
                edges {
                    node {
                        post_title
                        post_date
                        post_category
                        post_preview_description
                        post_author
                        _meta {
                            uid
                        }
                    }
                }
            }
            categs: allPosts(sortBy: post_category_ASC) {
                edges {
                    node {
                        post_category
                    }
                }
            }
        }

        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`

//{/* // to={"/blog/category/".concat(category.node.post_category)} */}