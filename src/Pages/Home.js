import React from 'react'
import Navbar from '../Components/Navbar'
import styled from 'styled-components'
import '../styles.scss'
import ColorButton from '../Components/ColorButton'
import { Link } from 'react-router-dom'
import TodoList from '../Images/todo-list-undraw.svg'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Hero = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    margin: 1rem;

    @media screen and (max-width: 768px){
        flex-direction: column;
        padding-bottom: 1rem;
    }
`
const Description = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 50%;
    padding: 1.5rem;

    @media screen and (max-width: 768px){
        padding: 0;
        width: 100%;
    }
`
const Typography = styled.p`
    font-size: 1.5rem;
    color: var(--primary-blue-extra-dark);
    width: 100%;
`

const TodoListImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;

    img{
        height: 100%;
        width: 100%;
    }

     @media screen and (max-width: 768px){
        width: 100%;
        padding-top: 1rem;
    }
`

function Home() {
    return (
        <Container>
            <Navbar />
            <Hero>
                <Description>
                    <Typography>
                        Welcome to <strong>Tu-Du</strong>, the ultimate solution for streamlined task management.
                        Our platform offers an effortless way to organize your daily tasks with features
                        such as easy task creation and customizable categories. Our user-friendly design
                        ensures a hassle-free experience, allowing you to focus on what matters most.
                        Say goodbye to chaos and hello to productivity with <strong>Tu-du</strong>.
                    </Typography>
                    <Link to='/todo' style={{ textDecoration: "none" }}>
                        <ColorButton
                            name="let's get started"
                            color="--tiara"
                            background="--primary-blue-dark"
                            backgroundHover="--primary-blue-extra-dark"
                        />
                    </Link>
                </Description>
                <TodoListImage>
                    <img src={TodoList} alt='Todo list' />
                </TodoListImage>
            </Hero>
        </Container>
    )
}

export default Home