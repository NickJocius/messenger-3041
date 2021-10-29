import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";
import SideBanner from "./components/Login/SideBanner";
import LinkBox from "./components/Login/LinkBox";
import FormInput from "./components/Login/FormInput";
import ErrorInput from "./components/Login/ErrorInput";
import UserForm from "./components/Login/UserForm";

const useStyles = makeStyles(() => ({
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
      <Grid container item xs={12} sm={8}>
        <LinkBox
          text="Already have an account?"
          userAction="Login"
        />   
        <UserForm
          heading="Create an account."
          userAction="Create"
          handler={handleRegister}
        >
          <FormInput
            title="Username"
            name="username"
            type="text"
            adorn={false}
            req={true}
          />
          <FormInput
            title="E-mail address"
            name="email"
            type="email"
            adorn={false}
            req={true}
          />
          <ErrorInput
            title="Password"
            name="password"
            type="password"
            formErrorMessage={formErrorMessage}
            adorn={false}
            req={true}
          />
          <ErrorInput
            title="Confirm Password"
            name="confirmPassword"
            type="password"
            formErrorMessage={formErrorMessage}
            adorn={false}
            req={true}
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
