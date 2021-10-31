import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import SideBanner from "./components/SideBanner/SideBanner";
import FormInput from "./components/forms/FormInput";
import UserForm from "./components/forms/UserForm";
import LinkBox from "./components/forms/LinkBox";

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
    <Grid container className={classes.root} spacing={0} >
      <Grid container item xs={12} sm={4} justifyContent="center">
        <SideBanner/>
      </Grid>
      <Grid container item xs={12} sm={8}>
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
            title="Username"
            name="username"
            adorn={false}
            type="text"
            req={false}
          />
          <FormInput
            title="Password"
            name="password"
            adorn={true}
            type="password"
            req={false}
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
