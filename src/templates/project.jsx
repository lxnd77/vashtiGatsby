
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import styled from "@emotion/styled"
import colors from "styles/colors"
import { Link, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Button from "components/_ui/Button"
import Layout from "components/Layout"
import "react-responsive-carousel/lib/styles/carousel.min.css";

var Carousel = require('react-responsive-carousel').Carousel;

const ProjectHeroContainer = styled("div")`
    background: ${colors.grey200};
    overflow: hidden;

    margin-bottom: 3.5em;
    align-items: center;

    .carousel .slide{
        background: rgba(0, 0, 0, 0);
    }
    .carousel .slide img{
        max-height:100%;
        max-width: 500px;
        margin: auto auto;
        padding-top: 3.5em;
    }
`

const ProjectTitle = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    text-align: center;
`

const ProjectBody = styled("div")`
    max-width: 550px;
    margin: auto auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            
        }
    }
`

const WorkLink = styled(Link)`
    margin-top: 3em;
    display: block;
    text-align: center;
`

const Project = ({ project, meta }) => {
    return (
        <>
            <Helmet
                defer={false}
                title={`${project.project_title[0].text} | Work`}
                titleTemplate={`%s | ${meta.title}`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${project.project_title[0].text} | Work`,
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
                <ProjectTitle>
                    {RichText.render(project.project_title)}
                </ProjectTitle>

                <ProjectHeroContainer>
                    <Carousel dynamicHeight={true}>
                        {project.picture_gallery.map((galleryItem, index) => (
                            <div key={`gallery-item-${index}`}>
                                <img
                                    src={galleryItem.image.url}
                                    alt={galleryItem.image.alt}
                                />
                            </div>
                        ))}
                    </Carousel>
                </ProjectHeroContainer>

                <ProjectBody>
                    {RichText.render(project.project_description)}
                    <WorkLink to={"/work"}>
                        <Button className="Button--secondary">
                            See other work
                        </Button>
                    </WorkLink>
                </ProjectBody>
            </Layout>
        </>
    )
}

export default ({ data }) => {
    const projectContent = data.prismic.allProjects.edges[0].node
    const meta = data.site.siteMetadata
    return <Project project={projectContent} meta={meta} />
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
}

export const query = graphql`
    query ProjectQuery($uid: String) {
        prismic {
            allProjects(uid: $uid) {
                edges {
                    node {
                        project_title
                        project_preview_description
                        project_preview_thumbnail
                        project_category
                        project_post_date
                        picture_gallery {
                            image
                        }
                        project_description
                        _meta {
                            uid
                        }
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
