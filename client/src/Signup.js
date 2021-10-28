import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";
import SideBanner from "./components/Login/SideBanner";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
  },
  top: {
    padding: '2rem 2rem 3rem 0',
    flexShrink: 1,
  },
  topText: {
    paddingTop: '1rem'
  },
  account: {
    width: 351,
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  button1: {
    width: 170,
    background: '#fff',
    color: '#3A8DFF',
    height: 54,
    fontFamily: 'Montserrat',
  },
  formBox: {
    maxWidth: '100%',
    width: 380,
    height: '100%',
  },
  input: {
    width: '98%',
    marginTop: '1.2rem',
    height: 65
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
    paddingBottom: '1rem'
  },
  button2: {
    background: ' #3A8DFF',
    color: '#fff',
    width: 160,
    maxWidth: '100%',
    height: 56,
    fontFamily: 'Montserrat',
    marginTop: '.5rem'
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root} spacing={0} justifyContent="space-around">
      <Grid container item xs={12} sm={4} justifyContent="center">
        <SideBanner/>
      </Grid>
      <Grid  item xs={12} sm={8}>
        <Grid container item spacing={0} className={classes.top} justifyContent="flex-end">
          <Grid container item xs={6}  sm={4} alignItems="start" justifyContent="flex-end">
            <Typography className={classes.topText}>Already have an account?</Typography>
          </Grid>
          <Grid container item xs={6} sm={4} justifyContent="flex-end"> 
            <Button onClick={() => history.push("/login")} variant="contained" size="large" className={classes.button1}>Login</Button>
          </Grid>   
        </Grid>
        <Grid container item xs={12} justifyContent="center">
        <Box className={classes.formBox}>
            <Typography variant='h4'>Create an account.</Typography>
            <form onSubmit={handleRegister}>
            <Grid >
                <Grid container item xs={12} justifyContent="center">
                  <Box className={classes.input}>
                    <FormControl margin="normal" required fullWidth>
                      <Typography>Username</Typography>
                      <TextField
                        aria-label="username"
                        margin="normal"
                        size="small"
                        name="username"
                        type="text"
                        required
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid container item xs={12} justifyContent="center">
                  <Box className={classes.input}>
                    <FormControl margin="normal" required fullWidth>
                      <Typography>E-mail address</Typography>
                      <TextField
                        margin="normal"
                        size="small"
                        aria-label="e-mail address"
                        type="email"
                        name="email"
                        required
                      />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid container item xs={12} justifyContent="center">
                  <Box className={classes.input}>
                    <FormControl margin="normal" required fullWidth error={!!formErrorMessage.confirmPassword}>
                      <Typography>Password</Typography>
                      <TextField
                        aria-label="password"
                        margin="normal"
                        size="small"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="password"
                        required
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid container item xs={12} justifyContent="center">
                  <Box className={classes.input}>
                    <FormControl margin="normal" required fullWidth error={!!formErrorMessage.confirmPassword}>
                      <Typography>Confirm Password</Typography>
                      <TextField
                        aria-label="confirm password"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="confirmPassword"
                        required
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid container item xs={12} justifyContent='center'>
                  <Box className={classes.buttonBox}>
                  <Button type="submit" variant="contained" size="large" className={classes.button2}>
                    Create
                  </Button>
                  </Box>
                </Grid>
        </Grid>
        </form>
        </Box>
        </Grid>
        </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
