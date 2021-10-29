import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import SideBanner from "./components/Login/SideBanner";
import FormInput from "./components/Login/FormInput";
import UserForm from "./components/Login/UserForm";
import LinkBox from "./components/Login/LinkBox";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
  },
  account: {
    width: 351,
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));

const Login = (props) => {
  const classes = useStyles();
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
      <Grid  item xs={12} sm={8} >
        <LinkBox
          text="Don't have an account?"
          userAction="Create account"
        />
        <UserForm
          heading="Welcome back!"
          userAction="Login"
          handler={handleLogin}
        >
          <FormInput
            name="Username"
            adorn={false}
            type="text"
          />
          <FormInput
            name="Password"
            adorn={true}
            type="password"
          />
        </UserForm>
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
