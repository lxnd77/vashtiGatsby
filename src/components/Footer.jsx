import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Logo from "images/icon.png";


const FooterContainer = styled("div")`
    padding-top: 3.75em;
    padding-bottom: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
        max-width: 50px;
    }
`

const FooterAuthor = styled("a")`
    font-size: 0.75em;
    color: ${colors.grey700};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    margin-top: 1.5em;

     &:hover {
         color: ${colors.blue900};
    }
`

const Footer = () => (
    <FooterContainer>
        <Link to="/">
            <img src={Logo} alt="Vashti Kalvi" width="100px" height="100px"/>
        </Link>
        <FooterAuthor href="https://google.com">
            © 2020 — Developed by Rishabh Bhargava
        </FooterAuthor>
    </FooterContainer>
)

export default Footer;
