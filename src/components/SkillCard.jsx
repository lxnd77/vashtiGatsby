import React from "react"
import { RichText } from "prismic-reactjs"
import styled from "@emotion/styled"
import dimensions from "styles/dimensions"
import colors from "styles/colors"
import PropTypes from "prop-types"
import { Box } from "rebass"

const SkillCardContainer = styled("div")`
    border: 1px solid ${colors.grey200};
    padding: 3em 2.5em 2.25em 2.5em;
    border-radius: 3px;
    text-decoration: none;
    color: currentColor;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 9px 24px rgba(21, 112, 116, 0.1);
    transition: all 150ms ease-in-out;
    max-width: 400px;

    &:hover {
        box-shadow: 0px 0px 20px rgba(21, 112, 116, 0.4);
        transition: all 150ms ease-in-out;

        .SkillCardAction {
            color: ${colors.blue500};
            transition: all 150ms ease-in-out;

            span {
                transform: translateX(0px);
                opacity: 1;
                transition: transform 150ms ease-in-out;
            }
        }
    }
`

const SkillTitle = styled("h3")`
    margin: 0;
    margin-top: 0.5em;
`

const SkillDescription = styled("div")`
    margin-top: 2em;
    margin-bottom: 4em;

    p:last-of-type {
        margin: 0;
    }
`

const SkillCardImageContainer = styled("div")`
    background: white;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: static;
    padding-top: 2em;
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 2em;

    @media (max-width: ${dimensions.maxwidthTablet}px) {
        padding-top: 2em;
        padding-bottom: 2em;
        max-height: 300px;
        flex-direction: row;
        align-items: center;
    }

    &:before {
        position: absolute;
        content: "";

        left: 0;
        top: 0;
        background: ${colors.vashti100};
        mix-blend-mode: multiply;
        opacity: 0;
        transition: all 150ms ease-in-out;
    }

    img {
        width: 100px;
        height: 100px;
        max-width: 300px;
        

        @media (max-width: ${dimensions.maxwidthTablet}px) {
            max-width: 300px;
        }
    }
`

const SkillCard = ({ title, text, image, uid }) => (
    <Box width={["100%", "50%", "33%"]} p={2}>
        <SkillCardContainer className="BlogSkillCard">
            <SkillCardImageContainer className="SkillCardImageContainer">
                <img src={image.url} alt={title[0].text} />
            </SkillCardImageContainer>
            <SkillTitle>{title[0].text}</SkillTitle>
            <SkillDescription>{RichText.render(text)}</SkillDescription>
        </SkillCardContainer>
    </Box>
)

export default SkillCard

SkillCard.propTypes = {
    title: PropTypes.array.isRequired,
    text: PropTypes.array.isRequired,
    image: PropTypes.object.isRequired,
    uid: PropTypes.string.isRequired,
}
