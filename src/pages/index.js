import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { RichText } from "prismic-reactjs";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import About from "components/About";
import Layout from "components/Layout";
import ProjectCard from "components/ProjectCard";
import SkillCard from "components/SkillCard";
import TestimonialCard from "components/TestimonialCard";
import { Box, Flex } from "rebass";

import profile from "images/profile.png";

const Hero = styled("div")`
    padding-top: 2em;
    max-width: 830px;

    @media(max-width:${dimensions.maxwidthMobile}px) {
       margin-bottom: 3em;
    }

    h1 {
        margin-bottom: 1em;

        a {
            text-decoration: none;
            transition: all 100ms ease-in-out;

            &:nth-of-type(1) { color: ${colors.blue500}; }
            &:nth-of-type(2) { color: ${colors.orange500}; }
            &:nth-of-type(3) { color: ${colors.purple500}; }
            &:nth-of-type(4) { color: ${colors.green500}; }
            &:nth-of-type(5) { color: ${colors.teal500}; }

            &:hover {
                cursor: pointer;
                transition: all 100ms ease-in-out;

                &:nth-of-type(1) { color: ${colors.blue600};    background-color: ${colors.blue200};}
                &:nth-of-type(2) { color: ${colors.orange600};  background-color: ${colors.orange200};}
                &:nth-of-type(3) { color: ${colors.purple600};  background-color: ${colors.purple200};}
                &:nth-of-type(4) { color: ${colors.green600};   background-color: ${colors.green200};}
                &:nth-of-type(5) { color: ${colors.teal600};    background-color: ${colors.teal200};}

            }
        }
    }
`
const ProfilePictureContainer = styled("div")`
    background: white;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    padding-left: 2em;
    padding-right: 2em;
    padding-top: 2em;
    padding-bottom: 2em;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        padding-top: 3em;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    &:before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: ${colors.vashti100};
        mix-blend-mode: multiply;
        opacity: 0;
        transition: all 150ms ease-in-out;
    }

    img {
        max-width: 500px;
        width: 100%;
        box-shadow: 0px 0px 12px ${colors.vashti100};

        @media(max-width:${dimensions.maxwidthTablet}px) {
            max-width: 300px;
        }
    }
`

const Section = styled("div")`

    display: flex;
    flex-direction: column;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        margin-bottom: 2em;
    }

    &:last-of-type {
        margin-bottom: 0;
    }
`

const WorkAction = styled(Link)`
    font-weight: 600;
    text-decoration: none;
    color: currentColor;
    transition: all 150ms ease-in-out;
    margin-left: auto;

    @media(max-width:${dimensions.maxwidthTablet}px) {
       margin: 0 auto;
    }

    span {
        margin-left: 1em;
        transform: translateX(-8px);
        display: inline-block;
        transition: transform 400ms ease-in-out;
    }

    &:hover {
        color: ${colors.vashti100};
        transition: all 150ms ease-in-out;

        span {
            transform: translateX(0px);
            opacity: 1;
            transition: transform 150ms ease-in-out;
        }
    }
`

const RenderBody = ({ home, projects, skills, testimonials, meta }) => (
    <>
        <Helmet
            defer={false}
            title={meta.title}
            titleTemplate={`%s`}
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
        
        <Hero>
            <>
                {RichText.render(home.hero_title)}
            </>
            {/* <Flex>
            
            <Box p={1} width={1/3}>
                <a href={home.hero_button_link.url}
                target="_blank" rel="noopener noreferrer">
                    <Button>
                        {RichText.render(home.hero_button_text)}
                    </Button>
                </a>
            </Box>
            </Flex> */}
        </Hero>
        <Section>
            {RichText.render(home.about_title)}
            <Flex flexWrap='wrap'>
                <Box p={1} width={['100%','100%',2/3]}>
                    <About
                    bio={home.about_bio}
                    socialLinks={home.about_links}
                    />
                </Box>
                <Box p={1} width={['100%','100%',1/3]}>
                    <ProfilePictureContainer className="ProfilePictureContainer">
                        <img src={profile} alt="Vashti"/>
                    </ProfilePictureContainer>
                </Box>
            </Flex>
        </Section>
        <Section>
            <h3>Skills</h3> 
            <Flex flexWrap='wrap'
            sx={{
                p: 4,
                
              }}>
            {skills.map((skill, i) => (
                <SkillCard
                    key = {i}
                    title = {skill.node.skill_title}
                    text = {skill.node.skill_text}
                    image = {skill.node.skill_image}
                    uid = {skill.node._meta.uid}
                />
            ))}
            </Flex>
        </Section>
        <Section>
            {projects.map((project, i) => (
                <ProjectCard
                    key={i}
                    category={project.node.project_category}
                    title={project.node.project_title}
                    description={project.node.project_preview_description}
                    thumbnail={project.node.project_preview_thumbnail}
                    uid={project.node._meta.uid}
                />
            ))}
            <WorkAction to={"/work"}>
                See more work <span>&#8594;</span>
            </WorkAction>
        </Section>
        <Section>
            <h3>Testimonials</h3>
            <Flex flexWrap='wrap'>
                {testimonials.map((testimonial,i) => (
                    <TestimonialCard
                        key={i}
                        title={testimonial.node.title}
                        text={testimonial.node.text}
                        image={testimonial.node.image}
                        uid={testimonial.node._meta.uid}
                    />
                ))}
            </Flex>
        </Section>
        
    </>
);

export default ({ data }) => {
    //Required check for no data being returned
    const doc = data.prismic.allHoms.edges.slice(0, 1).pop();
    const projects = data.prismic.allProjects.edges;
    const skills = data.prismic.allSkills.edges;
    const testimonials = data.prismic.allTestimonials.edges;
    const meta = data.site.siteMetadata;

    if (!doc || !projects || !skills || !testimonials) return null;

    return (
        <Layout>
            <RenderBody home={doc.node} projects={projects} skills={skills} testimonials={testimonials} meta={meta}/>
        </Layout>
    )
}

RenderBody.propTypes = {
    home: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    testimonials: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
};

export const query = graphql`
    {
        prismic {
            allHoms {
                edges {
                    node {
                        hero_title
                        hero_button_text
                        hero_button_link {
                            ... on PRISMIC__ExternalLink {
                                _linkType
                                url
                            }
                        }
                        content
                        about_title
                        about_bio
                        about_links {
                            about_link
                        }
                    }
                }
            }
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
            allSkills {
                edges {
                    node {
                        skill_title
                        skill_text
                        skill_image
                        _meta {
                            uid
                        }
                    }
                }
            }
            allTestimonials {
                edges {
                    node {
                        title
                        image
                        text
                        _meta{
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