import React from 'react';
import { styled } from "@mui/material/styles";
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Container = ({ children }) => {
    return (
        <Stack
            sx={{
                width: '100vw',
                minWidth: '1024px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#F9F9F9',
                paddingTop: '50px',
            }}
        >{children}</Stack>
    );
};

export const MainSection = ({ children }) => {
    return (
        <Stack
            sx={{
                width: '1024px',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'transparent',
            }}
        >{children}</Stack>
    )
};

export const InfoBar = ({ children }) => {
    return (
        <Box
            sx={{
                width: '1024px',
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
                paddingBottom: '30px',
            }}
        >{children}</Box>
    );
};

export const ProductsSection = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
            }}
        >{children}</Box>
    );
};

export const NoResultCase = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '1024px',
                backgroundColor: 'transparent',
                padding: '64px 0px 128px',
            }}
        >{children}</Box>
    );
};

export const Palette = {
    text_red: '#FF5058',
    text_black: '#212121',
    text_grey: '#888888',
    border_grey: '#EEEEEE',
    border_grey_ligth: '#CCCCCC',
};

export const SortButton = ({ children, isSelect, onClick}) => {
    return (
        <Box
            sx={{
                display: 'inline-block',
            }}
        >
            <Button
                disableTouchRipple
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent'
                    },
                    fontSize: '15px',
                    fontWeight: 400,
                    color: `${ isSelect ? Palette.text_red : Palette.text_black}`,
                }}
                onClick={onClick}
            >
                {children}
            </Button>
        </Box>
    );
};

export const ProductCell = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detail/${product.id}`);
    }
    return (
        <Button
            sx={{
                border: `1px solid ${Palette.border_grey}`,
                padding: '0',
                width: '100%',
                '&:hover': {
                    backgroundColor: 'transparent',
                }
            }}
            onClick={handleClick}
        >
            <Stack width='100%'>
                <Box
                    sx={{
                        position: 'relative',
                        display: 'block',
                        overflow: 'hidden',
                        width: '100%',
                        paddingBottom: '100%',
                    }}
                >
                    <img 
                        src={product.thumbnail} 
                        style={{ 
                            position: 'absolute',
                            display: 'block',
                            minWidth: '100%',
                            minHeight: '100%',
                            objectFit: 'contain',
                            borderBottom: '1px solid #E6E5EF',
                            backgroundColor: '#FAFAFD'
                        }}
                    />
                </Box>
                <Stack padding='15px 15px'>
                    <Typography 
                        textAlign='start' 
                        fontSize='16px' 
                        paddingBottom='15px'
                        color={Palette.text_black}
                    >{product.productName.slice(0,12) + "..."}</Typography>
                    <Typography 
                        textAlign='start' 
                        fontSize='18px' 
                        fontWeight='600'
                        color={Palette.text_black}
                    >{product.price} ETH</Typography>
                </Stack>
            </Stack>
        </Button>
    )
};

const PaginationButton = styled(Button)`
    width: 40px;
    min-width: 40px;
    heigth: 40px;
    min-height: 40px;
    font-size: 16px;
    padding: 0;
    color: ${Palette.text_grey};
    background-color: #FFFFFF;
    border: 0.5px solid ${Palette.border_grey_ligth};
    &:hover {
        background-color: #FFFFFF;
    };
`;

export const Pagination = ({ page, totalPage, setPage }) => {
    const startNum = Math.floor((page - 1) / 5) * 5 + 1;
    const endNum = (startNum + 4 <= totalPage ? startNum + 4 : totalPage);
    const handleChangePage = setPage;

    const getPaginationButtons = () => {
        const buttons = [];
        if (startNum >= 5) {
            buttons.push(
                <PaginationButton
                    sx={{ marginRight: '10px'}}
                    onClick={() => handleChangePage(startNum - 5)}
                >&lt;</PaginationButton>
            )
        }

        const nowButtonProperties = {
            color: '#FFFFFF',
            backgroundColor: Palette.text_red,
            border: '0',
        };
        const otherButtonProperties = {
            color: Palette.text_grey,
            backgroundColor: '#FFFFFF',
            border: `2px solid ${Palette.border_grey_ligth}`,
        }
        for (let i=startNum; i <= endNum; i++) {
            let buttonProperties = {}; 
            
            if (i == page) {
                buttonProperties = {
                    color: nowButtonProperties.color,
                    backgroundColor: nowButtonProperties.backgroundColor,
                    border: nowButtonProperties.border,
                };
            } else {
                buttonProperties = {
                    color: otherButtonProperties.color,
                    backgroundColor: otherButtonProperties.backgroundColor,
                    border: otherButtonProperties.border, 
                }
            }

            buttons.push(
                <PaginationButton 
                    sx={{
                        marginRight: '10px',
                        color: buttonProperties.color,
                        backgroundColor: buttonProperties.backgroundColor,
                        border: buttonProperties.border,
                        '&:hover': {
                            backgroundColor: buttonProperties.backgroundColor
                        },
                    }}
                    onClick={() => handleChangePage(i)}
                >{i}</PaginationButton>
            );
        }

        if (endNum < totalPage) {
            buttons.push(
                <PaginationButton
                    onClick={() => handleChangePage(endNum + 1)}
                >&gt;</PaginationButton>
            )
        }

        return buttons;
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '45px 0 150px'
            }}
        >
            {getPaginationButtons()}
        </Box>
    );
}
