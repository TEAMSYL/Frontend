import React from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Box } from '@mui/material';
import { Paper, Button } from '@mui/material'

const AdCarousel = () => {
    const items = [
        {
            src: "/images/img1.png",
        },
        {
            src: "/images/img2.png",
        },
        {
            src: "/images/img3.png",
        }
    ];

    return (
        <Carousel
                sx={{
                    height: "300px",
                    width: "1024px",
                }}
                navButtonsProps={{
                    style: {
                        backgroundColor: 'transparent',
                    },
                    "&:hover": {
                        backgroundColor: 'transparent',
                    }
                }}
                indicatorContainerProps={{
                    sytle: {
                        backgroundColor: "#212121",
                    }
                }}
                interval={4000}
                animation="slide"
                NextIcon={<ArrowCircleRightIcon sx={{fontSize:40}}/>}
                PrevIcon={<ArrowCircleLeftIcon sx={{fontSize:40}}/>}
            >
            {items.map( (item, i) => <Item key={i} item={item} /> )}
        </Carousel>        
    );
};

function Item(props)
{
    return (
        <img src={props.item.src} style={{height: '300px', width:'100%'}}></img>
    );
}

export default AdCarousel;