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
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2.5em;

    @media(max-width: 1050px) {
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 1.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-template-columns: 1fr;
        grid-gap: 2.5em;
    }
`
const CategoryButtonContainer = styled("div")`
    margin-bottom: 1em;
`


const Blog = ({ posts, meta, categories }) => {
    
    var temp = [];
    var done = [];
    for(let i=0; i<categories.length; i++){
        if(!done.includes(categories[i].node.post_category[0].text)){
            
            done.push(categories[i].node.post_category[0].text);
            temp.push(categories[i]);
        }
    }
    const uniqueCategories = temp;

    const [filteredPosts, setFilteredPosts] = useState(posts);

    const onCategoryClick = (category) => {
        let f = posts.filter((post) => {
            return post.node.post_category[0].text.includes(category);
        });
        setFilteredPosts(f);
    }

    return(
    <>
        <Helmet
            defer={false}
            title={`Blog`}
            titleTemplate={`%s | Vashti Kalvi`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: meta.title,
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
            <CategoryButtonContainer>
                <Flex>
                    {uniqueCategories.map((category,i) => (
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
            </CategoryButtonContainer>
            <BlogGrid>
                {filteredPosts.map((post, i) => (
                    <PostCard
                        key={i}
                        author={post.node.post_author}
                        category={post.node.post_category}
                        title={post.node.post_title}
                        date={post.node.post_date}
                        description={post.node.post_preview_description}
                        image={post.node.post_hero_image}
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
    const categories = data.prismic.postcategs.edges;
    
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
                        post_hero_image
                        _meta {
                            uid
                        }
                    }
                }
            }
            postcategs: allPosts(sortBy: post_category_ASC) {
                
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