import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import '../styles.scss'
import { ThemeProvider, createTheme } from '@mui/material/styles';

function ColorButton({ name, color, background, backgroundHover, type, variant, startIcon, styles, clickfunction }) {

    const buttonColor = getComputedStyle(document.documentElement).getPropertyValue(`${color}`).trim();
    const buttonBackground = getComputedStyle(document.documentElement).getPropertyValue(`${background}`).trim();
    const buttonBackgroundHover = getComputedStyle(document.documentElement).getPropertyValue(`${backgroundHover}`).trim();

    const theme = createTheme({
        palette: {
            primary: {
                main: buttonColor,
                light: buttonBackground
            },
            secondary: {
                main: buttonBackgroundHover,
            },
        },
    });

    const StyleButton = styled(Button)(({ theme }) => ({
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,

        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    }))

    return (
        <ThemeProvider theme={theme}>
            <StyleButton 
                type={type} 
                variant={variant}
                startIcon={startIcon}
                style={styles}
                onClick={clickfunction}
            >
                {name}
            </StyleButton>
        </ThemeProvider>
    )
}

export default ColorButton