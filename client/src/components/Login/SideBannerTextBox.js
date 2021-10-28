import React from 'react';
import { Box, Typography } from "@material-ui/core";
import bubble from '../../assets/images/bubble.svg';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        maxWidth: 268,
    },
    oval: {
        marginBottom: '2rem',
    },
    chat: {
        color: "#fff",
        fontSize: 26,
        padding: 0,
        minWidth: '100%'
    }
}));

const SideBannerTextBox = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <img src={bubble} alt="bubble image" className={classes.oval} />
            <Typography className={classes.chat} gutterBottom>
                Converse with anyone with any language
            </Typography>
        </Box>
    )
};

export default SideBannerTextBox;
