import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Logo from "images/logo.png";

const HeaderContainer = styled("div")`
    
    
`

const HeaderContent = styled("div")`
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
    a{
        position: static;
    }
`

const HeaderLinks = styled("div")`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 7em;
    justify-content: flex-end;
    width: 100%;
    height: 50%;
    max-width: 200px;
    margin-right: 1em;
    @media(max-width: ${dimensions.maxwidthTablet}px) {
        grid-gap: 5.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-gap: 2.5em;
    }

    a {
        color: ${colors.vashti100};
        text-decoration: none;
        border-bottom: 5px solid transparent;
        font-weight: 600;
        font-size: 1.25em;
        height: 100%;
        padding-bottom: 1.25em;
        padding-top: 2em;
        display: block;
        position: relative;

        &:after {
            position: absolute;
            content: "";
            bottom: 0;
            width: 18px;
            height: 3px;
            background: transparent;
            bottom: -3px;
            right: 50%;
            margin-right: -9px;
            transition: 500ms ease-in-out background;
        }

        &:hover {
            &:after {
                background: ${colors.vashti100};
                transition: 500ms ease-in-out background;
            }
        }

        &.Link--is-active {
            &:after {
                background: ${colors.vashti100};
                transition: 500ms ease-in-out background;
            }
        }
    }
`

const Header = () => (
    <HeaderContainer>
        <HeaderContent>
            <Link to="/">
                <img src={Logo} alt="Vashti Kalvi" width="150px" height="150px"/>
            </Link>
            <HeaderLinks>
                <Link
                    activeClassName="Link--is-active"
                    to="/work">
                    Work
                </Link>
                <Link
                    activeClassName="Link--is-active"
                    to="/blog">
                    Blog
                </Link>
            </HeaderLinks>
        </HeaderContent>
    </HeaderContainer>
)

export default Header;