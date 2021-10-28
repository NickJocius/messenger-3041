import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import SideBanner from "./components/Login/SideBanner";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
  },
  top: {
    maxHeight: 54,
  },
  formBox: {
    maxWidth: '100%',
    width: 380,
    height: 358,
  },
  input: {
    width: '100%',
    marginTop: '2rem',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  button: {
    background: ' #3A8DFF',
    color: '#fff',
    width: 160,
    maxWidth: '100%',
    height: 56,
  }

}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid container item xs={12} sm={4} justify="center">
        <SideBanner/>
      </Grid>
      <Grid container item xs={12} sm={8} >
        <Grid container spacing={0} className={classes.top}>
          <Grid container item xs={12} justifyContent="flex-end" >
            <Typography>Need to register?</Typography>
            <Button onClick={() => history.push("/register")}>Register</Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Box className={classes.formBox}>
            <Typography variant='h4'>Welcome back!</Typography>
            <form onSubmit={handleLogin}>
              <Grid >
                <Grid container item xs={12}>
                  <Box className={classes.input}>
                  <FormControl margin="normal" required fullWidth>
                  <Typography>E-mail address</Typography>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                    />
                  </FormControl>
                  </Box>
                </Grid>
                <Box className={classes.input}>
                <FormControl margin="normal" required fullWidth>
                <Typography>Password</Typography>
                  <TextField
                    label="password"
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                </FormControl>
                </Box>
                <Grid>
                  <Box className={classes.buttonBox}>
                  <Button type="submit" variant="contained" size="large" className={classes.button}>
                    Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
