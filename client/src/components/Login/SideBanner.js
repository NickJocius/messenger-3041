import React from 'react';
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SideBannerTextBox from './SideBannerTextBox';
import bgImg from "../../assets/images/bg/bg-img.png"

const useStyles = makeStyles(() => ({
    root: {
        minWidth: '100%',
        background: `center / cover no-repeat url(${bgImg})`,
    },
    overlay: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, rgba(57,141,255,0.85) , rgba(134,185,255,0.85) )',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    }
  }));

const SideBanner = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.overlay}>
                <SideBannerTextBox/>
            </Box>
        </Box>
    );
};

export default SideBanner;
