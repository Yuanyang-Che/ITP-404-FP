import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/UserAuthProvider";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1400px",
  },
}));

const UserAccess = () => {
  const classes = useStyles();
  const [signInPage, setSignInPage] = useState(false);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  //Added useEffect; step 1 to refresh stay login
  useEffect(() => {
    document.title = "Sign In";
    const loggedInUser = localStorage.getItem("user_id");
    if (loggedInUser) {
      setSignInPage(true);
      history.push("/dashboard");
    }
  }, [history]);

  function signInToggle() {
    setSignInPage((signInPage) => !signInPage);
    document.title = signInPage ? "Sign In" : "Login";
  }

  return (
    <Container className={classes.root} maxWidth={false}>
      {signInPage ? (
        <SignIn toggle={signInToggle} onSignInSubmit={authContext.onSignIn} />
      ) : (
        <SignUp toggle={signInToggle} onSignUpSubmit={authContext.onSignUp} />
      )}
    </Container>
  );
};

export default UserAccess;
