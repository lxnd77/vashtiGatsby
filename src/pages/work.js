import React, {useState}  from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Button from "components/_ui/Button";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import { Flex } from "rebass";
import ProjectCard from "components/ProjectCard";

const WorkTitle = styled("h1")`
    margin-bottom: 1em;
`
const CategoryButtonContainer = styled("div")`
    margin-bottom: 1em;
`

const Work = ({ projects, meta, categories }) => {
    
    var temp = [];
    var done = [];
    for(let i=0; i<categories.length; i++){
        if(!done.includes(categories[i].node.project_category[0].text)){
            
            done.push(categories[i].node.project_category[0].text);
            temp.push(categories[i]);
        }
    }
    const uniqueCategories = temp;

    const [filteredProjects, setFilteredProjects] = useState(projects);

    const onCategoryClick = (category) => {
        let f = projects.filter((project) => {
            return project.node.project_category[0].text.includes(category);
        });
        setFilteredProjects(f);
    }

    return(
    <>
        <Helmet
            defer={false}
            title={`Work`}
            titleTemplate={`%s | Vashti Kalvi`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Work | Vashti Kalvi`,
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
            <WorkTitle>
                Work
            </WorkTitle>
            <CategoryButtonContainer>
                <Flex>
                    {uniqueCategories.map((category,i) => (
                        <Button
                        key={i}
                        onClick={()=>onCategoryClick(category.node.project_category[0].text)}>
                            {category.node.project_category[0].text}    
                        </Button>
                            
                    ))}
                    <Button 
                    onClick={()=>onCategoryClick("")}>
                        All
                    </Button>
                </Flex>
            </CategoryButtonContainer>
            <>
                {filteredProjects.map((project, i) => (
                    <ProjectCard
                        key={i}
                        category={project.node.project_category}
                        title={project.node.project_title}
                        description={project.node.project_preview_description}
                        thumbnail={project.node.project_preview_thumbnail}
                        uid={project.node._meta.uid}
                    />
                ))}
            </>
        </Layout>
    </>
    );
}

export default ({ data }) => {
    const projects = data.prismic.allProjects.edges;
    const meta = data.site.siteMetadata;
    const categories = data.prismic.categs.edges;

    if (!projects) return null;
    if (!categories) return null;

    return (
        <Work projects={projects} meta={meta} categories={categories}/>
    )
}

Work.propTypes = {
    projects: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
};

export const query = graphql`
    {
        prismic {
            allProjects {
                edges {
                    node {
                        project_title
                        project_preview_description
                        project_preview_thumbnail
                        project_category
                        project_post_date
                        _meta {
                            uid
                        }
                    }
                }
            }
            categs: allProjects(sortBy: project_category_ASC) {
                
                edges {
                    node {
                        project_category
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

