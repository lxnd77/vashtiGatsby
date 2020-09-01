import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";
import colors from "styles/colors";
import PropTypes from "prop-types";

const SkillCardContainer = styled("div")`
    border: 1px solid ${colors.grey200};
    padding: 3em 2.5em 2.25em 2.5em;
    border-radius: 3px;
    text-decoration: none;
    color: currentColor;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
    transition: all 150ms ease-in-out;
    max-width: 300px;

    &:hover {
        box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.1);
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
    background: ${colors.grey200};
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    padding-left: 2em;
    padding-right: 2em;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        padding-top: 3em;
        max-height: 200px;
        flex-direction: row;
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
        background: ${colors.blue500};
        mix-blend-mode: multiply;
        opacity: 0;
        transition: all 150ms ease-in-out;
    }

    img {
        max-width: 200px;
        width: 100%;
        box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);

        @media(max-width:${dimensions.maxwidthTablet}px) {
            max-width: 300px;
        }
    }
`

const SkillCard = ({ title, text, image, uid}) => (
    <SkillCardContainer className="BlogSkillCard">
        <SkillCardImageContainer className="SkillCardImageContainer">
            <img src={image.url} alt={title[0].text}/>
        </SkillCardImageContainer>
        <SkillTitle>
            {title[0].text}
        </SkillTitle>
        <SkillDescription>
            {RichText.render(text)}
        </SkillDescription>       
    </SkillCardContainer>
)

export default SkillCard;

SkillCard.propTypes = {
    title: PropTypes.array.isRequired,
    text: PropTypes.array.isRequired,
    image: PropTypes.object.isRequired,
    uid: PropTypes.string.isRequired
}