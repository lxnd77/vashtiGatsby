import React from "react"
import { RichText } from "prismic-reactjs"
import styled from "@emotion/styled"
import dimensions from "styles/dimensions"
import colors from "styles/colors"
import PropTypes from "prop-types"
import { Box } from "rebass"

const TestimonialCardContainer = styled("div")`
    border: 1px solid ${colors.grey200};
    padding: 2.5em 2.5em 2.5em 2.5em;
    border-radius: 3px;
    text-decoration: none;
    color: currentColor;
    display: flex;
    flex-direction: row;
    box-shadow: 0px 9px 24px rgba(21, 112, 116, 0.1);
    transition: all 150ms ease-in-out;
    max-height: 100%;
    width: 100%;
    margin-top: 1em;

    @media (max-width: ${dimensions.maxwidthTablet}px) {
        flex-direction: column;
    }


    &:hover {
        box-shadow: 0px 0px 20px rgba(21, 112, 116, 0.4);
        transition: all 150ms ease-in-out;

        .TestimonialCardAction {
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

const TestimonialTitle = styled("h3")`
    margin-top: 2em;
    margin-bottom: 2em;
    margin-right: 2em;
    
`

const TestimonialDescription = styled("div")`
    
    
    max-width: 100%;
    vertical-align: middle;
    width: 100%;
    min-height: 100%;
`

const TestimonialCardImageContainer = styled("div")`
    
    overflow: hidden;
    position: relative;
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 2em;
    padding-top: 2em;
    margin: auto auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: ${dimensions.maxwidthTablet}px) {
        
        padding: 3em 3em;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        
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
        width: 100%;
        height: auto;
        margin: auto auto;
        @media (max-width: ${dimensions.maxwidthTablet}px) {
            
        }
    }
`

const TestimonialCard = ({ title, text, image, uid }) => (
    <TestimonialCardContainer>
        <Box width={["100%","100%","20%"]}> 
            <TestimonialCardImageContainer><img src={image.url} alt={title[0].text} /></TestimonialCardImageContainer>
        </Box>
        <Box width={["100%","100%", "20%"]}>
            <TestimonialTitle>{title[0].text}</TestimonialTitle>
        </Box>
        <Box width={["100%","100%", "60%"]}>
            <TestimonialDescription>{RichText.render(text)}</TestimonialDescription>
        </Box>
        {/* <TestimonialCardContainer className="BlogTestimonialCard">
            <TestimonialCardImageContainer className="TestimonialCardImageContainer">
                <img src={image.url} alt={title[0].text} />
            </TestimonialCardImageContainer>
            <TestimonialTitle>{title[0].text}</TestimonialTitle>
            <TestimonialDescription>{RichText.render(text)}</TestimonialDescription>
        </TestimonialCardContainer> */}
    </TestimonialCardContainer>
)

export default TestimonialCard

TestimonialCard.propTypes = {
    title: PropTypes.array.isRequired,
    text: PropTypes.array.isRequired,
    image: PropTypes.object.isRequired,
    uid: PropTypes.string.isRequired,
}
