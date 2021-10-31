import React from 'react';
import { useHistory } from "react-router-dom";
import {
    Grid,
    Typography,
    Button,
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2rem 2rem 0 2rem',
        [theme.breakpoints.down('xs')]: {
            padding: '2rem 2rem 1rem 1rem',
            justifyContent: 'center'
        },
        flexGrow: 0
    },
    topText: {
        paddingTop: '1rem',
        color: theme.palette.secondary.main,
        [theme.breakpoints.down('xs')]: {
            fontSize: 14,
        }
    },
    button1: {
        width: 170,
        background: theme.palette.neutral.main,
        color: theme.palette.primary.main,
        fontSize: theme.typography.fontSize,
        height: 54,
      },
}));

export const LinkBox = ({text, userAction}) => {

    const classes = useStyles();
    const history = useHistory();

    const buttonLink = (userAction === "Login" ? "/login" : "/register");

    return (

        <Grid container item spacing={0} className={classes.root} justifyContent="flex-end">
          <Grid container item xs={6}  sm={4} alignItems="flex-start" justifyContent="flex-end">
            <Typography className={classes.topText}>{text}</Typography>
          </Grid>
            <Grid container item xs={6} sm={4} justifyContent="flex-end">
            <Button onClick={() => history.push(`${buttonLink}`)} variant="contained" size="large" className={classes.button1}>{userAction}</Button>
          </Grid>   
        </Grid>
    )
}
export default LinkBox;