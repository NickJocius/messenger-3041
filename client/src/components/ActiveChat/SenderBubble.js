import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  imageBox: {
    display: 'flex',
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  image: {
    maxWidth: 150,
    maxHeight: 150,
    [theme.breakpoints.down('xs')]: {
      width: 125,
      height: 125,
      marginLeft: 0,
      marginBottom: theme.spacing(2)
    },
    borderRadius: '15px 15px 0 15px',
    marginLeft: theme.spacing(2),
    
  },
  photo: {
    width: 20,
    height: 20,
    borderRadius: '50%'
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, image } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.imageBox}>
        {image && image.map((i) => (
            <img key={image + Math.random()} src={i} alt="send attachment" className={classes.image}/>
        ))}
      </Box>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default SenderBubble;
