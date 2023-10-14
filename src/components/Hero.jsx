import React from 'react';
import { logo } from '../assets';
import { Button, Container, Toolbar, Typography } from '@mui/material';

const Hero = () => {
    return (
        <Container
            sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "2.5rem",
                    paddingTop: "0.75rem",
                    flexWrap: "wrap", 
                }}
            >
                <img src={logo} alt='sumz_logo' style={{ width: "7rem", objectFit: "contain" }} />

                <Button
                    onClick={() => window.open('https://github.com/RaphaelDeAlm9')}
                    sx={{
                        borderRadius: "9999px",
                        borderWidth: "1px",
                        borderOpacity: "1",
                        borderColor: "rgb(0 0 0)",
                        bgOpacity: "1",
                        backgroundColor: "rgb(0 0 0)",
                        padding: "0.375rem 1.25rem 0.375rem 1.25rem",
                        fontSize: "0.875rem",
                        lineHeight: "1.25rem",
                        textOpacity: "1",
                        color: "rgb(255 255 255)",
                        transitionProperty: "all",
                        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                        transitionDuration: "150ms",

                        "&:hover": {
                            bgOpacity: "1",
                            backgroundColor: "rgb(255 255 255)",
                            textOpacity: "1",
                            color: "rgb(0 0 0)",
                        }
                    }}
                >
                    Github
                </Button>
            </Toolbar>

            <Typography
                sx={{
                    marginTop: "1.25rem",
                    fontSize: "3rem", 
                    lineHeight: "1",
                    fontWeight: "800",
                    textOpacity: "1",
                    color: "rgb(0 0 0)",
                    textAlign: "center",
                    zIndex: "10",
                }}
            >
                Résumer des articles avec
                <Typography 
                    sx={{
                        background: "linear-gradient(to right, #ff8a00 0%, #dd4c4f 100%)",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        fontSize: "3rem", 
                        lineHeight: "1",
                        fontWeight: "800",
                    }}
                >
                    OpenAI GPT
                </Typography>
                <Typography
                    sx={{
                        marginTop: "20px",
                        maxWidth: "42rem",
                        fontSize: "1rem", 
                        lineHeight: "1.5rem", 
                        textAlign: "center",
                        color: "#4B5563",
                    }}
                >
                    Simplifiez votre lecture avec Summize, un résumeur d'articles 
                    open-source qui transforme les articles longs en résumés clairs et concis.
                </Typography>
            </Typography>
        </Container >
    );
};

export default Hero;