import React from 'react';
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImg from "../../assets/images/bg/bg-img.png"

const useStyles = makeStyles(() => ({
    root: {
        minWidth: '100%',
        background: `center url(${bgImg})`
    }
  }));

const SideBanner = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            hello
        </Box>
    );
};

export default SideBanner;
