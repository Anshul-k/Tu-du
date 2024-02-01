import styled from "styled-components"
import React from 'react'
import Logo from "../Images/Logo/logo_transparent.png"
import '../styles.scss'
import { Link } from "react-router-dom"

const NavbarWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const NavbarLogo = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    width: auto;

    img{
        width: 6rem;
        height: 6rem;
        position: relative;
    }
`

function Navbar() {
    return (
        <NavbarWrapper>
            <NavbarLogo>
                <Link to="/" style={{ textDecoration: "none" }}><img src={Logo} alt="Tu-du" /></Link>
            </NavbarLogo>
        </NavbarWrapper>
    )
}

export default Navbar