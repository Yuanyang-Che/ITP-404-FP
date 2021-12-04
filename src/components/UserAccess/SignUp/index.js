import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import React, { useState } from "react";
import SignUpModal from "./SignUpModal";
import "bootstrap/dist/css/bootstrap.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    marginTop: "5vh",
    marginBottom: "5vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(6, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.info.main,
    width: 70,
    height: 70,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1.5, 0, 1.5),
  },
  border: {
    borderColor: theme.palette.secondary.dark,
  },
}));

export default function SignIn({ toggle, onSignUpSubmit }) {
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);

  const classes = useStyles();

  const onInputChange = (e) => {
    setError({
      email: "",
      username: "",
      password: "",
    });
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.email)) {
      setError({ ...error, email: `Invalid Email` });
      return;
    }

    if (input.username === "") {
      setError({ ...error, username: `Invalid Username` });
      return;
    }
    if (input.password === "") {
      setError({ ...error, password: `Invalid Password` });
      return;
    }
    setShowModal(true);
  };

  const onFormReset = () => {
    setInput({
      username: "",
      password: "",
      email: "",
    });

    setError({
      username: "",
      password: "",
      email: "",
    });
  };

  return (
    <Grid container className={classes.root} component={Card} raised>
      <Grid
        item
        xs={false}
        sm={false}
        md={5}
        lg={7}
        className={classes.image}
      />

      <Grid item xs={12} sm={12} md={7} lg={5}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddRoundedIcon style={{ fontSize: 55 }} />
          </Avatar>
          <Typography component="h1" variant="h4" data-testid={`signup-title`}>
            Sign Up
          </Typography>

          {showModal && (
            <SignUpModal
              onSignUp={() => {
                onSignUpSubmit(
                  {
                    username: input.username,
                    password: input.password,
                    email: input.email,
                  },
                  () => {
                    setShowModal(false);
                  }
                );
              }}
              onClose={() => {
                setShowModal(false);
              }}
            />
          )}
          <form className={classes.form} onSubmit={onFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              //required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              color="secondary"
              placeholder="e.g. ttrojan@usc.edu"
              value={input.email}
              data-testid={`signup-email-tf`}
              onChange={(e) => onInputChange(e)}
            />
            {error.email && (
              <p data-testid={`signup-email-error`}>{error.email}</p>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              //required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              color="secondary"
              placeholder="e.g. tommy_trojan"
              value={input.username}
              data-testid={`signup-username-tf`}
              onChange={(e) => onInputChange(e)}
            />
            {error.username && (
              <p data-testid={`signup-username-error`}>{error.username}</p>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              //required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="secondary"
              placeholder="*************"
              value={input.password}
              data-testid={`signup-password-tf`}
              onChange={(e) => onInputChange(e)}
            />
            {error.password && (
              <p data-testid={`signup-password-error`}>{error.password}</p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              data-testid={`signup-signup1-btn`}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              className={classes.submit}
              data-testid={`signup-reset-btn`}
              onClick={() => onFormReset()}
            >
              Reset
            </Button>
            <Box borderBottom={2} className={classes.border} mt={2} mb={2} />
          </form>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={toggle}
            data-testid={`signup-to-login-btn`}
          >
            Already Have an Account?
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}
