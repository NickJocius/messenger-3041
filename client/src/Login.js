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
  InputAdornment,
  
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import SideBanner from "./components/Login/SideBanner";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
  },
  top: {
    padding: '2rem',
    flexGrow: 1
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
  button2: {
    background: ' #3A8DFF',
    color: '#fff',
    width: 160,
    maxWidth: '100%',
    height: 56,
    fontFamily: 'Montserrat'
  },
  adornment: {
    '& p': {
      color: ' #3A8DFF',
      fontSize: 12,
    }
    
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
      <Grid container item xs={12} sm={4} justifyContent="center">
        <SideBanner/>
      </Grid>
      <Grid container item xs={12} sm={8} >
        <Grid container spacing={0} className={classes.top} justifyContent="flex-end">
          <Grid container item xs={6}  sm={4} alignItems="start" justifyContent="flex-end">
            <Typography className={classes.topText}>Don't have an account?</Typography>
          </Grid>
          <Grid container item xs={6} sm={4} justifyContent="flex-end"> 
            <Button onClick={() => history.push("/register")} variant="contained" size="large" className={classes.button1}>Create account</Button>
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
                  <Typography>Username</Typography>
                      <TextField
                        margin="normal"
                        aria-label="username"
                        size="medium"
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
                      margin="normal"
                      size="medium"
                      aria-label="password"
                      type="password"
                      name="password"
                      InputProps={{
                        endAdornment: <InputAdornment position="end" className={classes.adornment}>Forgot?</InputAdornment>
                      }}
                    />
                </FormControl>
                </Box>
                <Grid>
                  <Box className={classes.buttonBox}>
                  <Button type="submit" variant="contained" size="large" className={classes.button2}>
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
