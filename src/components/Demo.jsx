import React from 'react';
import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from "../assets";
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useLazyGetSummaryQuery } from "../services/article";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Demo = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    });
    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState("");

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem('articles')
        )

        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage)
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const existingArticle = allArticles.find(
            (item) => item.url === article.url
        );

        if (existingArticle) return setArticle(existingArticle);

        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArticles];

            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
            localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
        }
    }

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };

    const handleDelete = (index) => {
        const updatedArticles = [...allArticles];
        updatedArticles.splice(index, 1);
        setAllArticles(updatedArticles);
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
    };


    return (
        <Container
            sx={{
                marginTop: "4rem",
                width: "100%",
                maxWidth: "36rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    width: "100%",
                }}
            >
                <form
                    style={{
                        display: "flex",
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onSubmit={handleSubmit}
                >
                    <img
                        src={linkIcon}
                        alt='link_icon'
                        style={{
                            position: "absolute",
                            left: "0",
                            marginTop: "0.5rem",
                            marginBottom: "0.5rem",
                            marginLeft: "0.75rem",
                            width: "1.25rem",
                            zIndex: "10",
                        }}
                    />
                    <TextField
                        type='url'
                        placeholder='Entrer un URL'
                        variant='standard'
                        fullWidt
                        value={article.url}
                        onChange={(e) => setArticle({
                            ...article, url: e.target.value
                        })}
                        onKeyDown={handleKeyDown}
                        required
                        sx={{
                            display: "block",
                            padding: "0.625rem 3rem 0.625rem 2.5rem",
                            borderRadius: "0.375rem",
                            borderWidth: "1px",
                            borderColor: "#E5E7EB",
                            width: "100%",
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            fontWeight: "500",
                            backgroundColor: "#ffffff",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        }}
                    />
                    <Button
                        type='submit'
                        sx={{
                            display: "flex",
                            position: "absolute",
                            top: "0",
                            bottom: "0",
                            right: "0",
                            marginTop: "0.375rem",
                            marginBottom: "0.375rem",
                            marginRight: "0",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#BFBFBF",
                            width: "2.5rem",
                            fontFamily: "Satoshi, sans-serif",
                            lineHeight: "1.25rem",
                            fontWeight: "500",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        }}
                    >
                        ↵
                    </Button>
                </form>

                <Box
                    sx={{
                        display: "flex",
                        overflowY: "auto",
                        flexDirection: "column",
                        gap: "0.25rem",
                    }}
                >
                    {allArticles.reverse().map((item, index) => (
                        <Box
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                            sx={{
                                display: "flex",
                                padding: "0.75rem",
                                flexDirection: "row",
                                gap: "0.75rem",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                borderRadius: "0.5rem",
                                borderWidth: "1px",
                                borderColor: "#E5E7EB",
                                backgroundColor: "#ffffff",
                                zIndex: "10",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    backdropBlur: "blur(8px)",
                                    zIndex: "10",
                                }}
                                onClick={() => handleCopy(item.url)}
                            >
                                <img
                                    src={copied === item.url ? tick : copy}
                                    alt={copied === item.url ? "tick_icon" : "copy_icon"}
                                    style={{
                                        objectFit: "contain",
                                        width: "80%",
                                        height: "80%",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "9999px",
                                    backdropBlur: "blur(8px)",
                                    zIndex: "10",
                                }}
                                onClick={() => handleDelete(item.url)}
                            >
                                <DeleteOutlineIcon
                                    sx={{
                                        objectFit: "contain",
                                        width: "15px",
                                        height: "15px",
                                        color: "#D8D8D8",
                                    }}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    flex: "1 1 0%",
                                    fontSize: "0.875rem",
                                    lineHeight: "1.25rem",
                                    fontWeight: "500",
                                    color: "#1D4ED8",
                                    zIndex: "10",
                                }}
                            >
                                {item.url}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    marginTop: "2.5rem",
                    marginBottom: "2.5rem",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "100%",
                }}
            >
                {isFetching ? (
                    <img
                        src={loader}
                        alt='loader'
                        style={{
                            objectFit: "contain",
                            width: "5rem",
                            height: "5rem",
                        }}
                    />
                ) : error ? (
                    <Typography
                        sx={{
                            fontWeight: "700",
                            textAlign: "center",
                            color: "#000000",
                            zIndex: "10",
                        }}
                    >
                        Ce n'était pas censé arriver...
                        <br />
                        <span
                            style={{
                                fontWeight: "400",
                                color: "#374151",
                                zIndex: "10",
                            }}
                        >
                            {error?.data?.error}
                        </span>
                    </Typography>
                ) : (
                    article.summary && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.75rem",
                                zIndex: "10",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "1.25rem",
                                    lineHeight: "1.75rem",
                                    fontWeight: "700",
                                    color: "#4B5563",
                                }}
                            >
                                Résumé de l'article
                            </Typography>
                            <Box
                                sx={{
                                    borderRadius: "0.75rem",
                                    borderWidth: "1px",
                                    borderColor: "#E5E7EB",
                                    backdropBlur: "blur(8px)",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "0.875rem",
                                        lineHeight: "1.25rem",
                                        fontWeight: "500",
                                        color: "#374151",
                                    }}>
                                    {article.summary}
                                </Typography>
                            </Box>
                        </Box>
                    )
                )}
            </Box>
        </Container>
    );
};

export default Demo;