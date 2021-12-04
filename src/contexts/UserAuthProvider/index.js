import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import UserAccess from "../../adapters/UserAccess";
import { toast } from "react-toastify";

export let AuthContext = createContext({
  userID: "",
  userName: "",
  isSignedIn: false,
  onSignIn: () => {},
  onSignUp: () => {},
  onLogout: () => {},
});

export const UserAuthProvider = ({ children }) => {
  const history = useHistory();
  //Added conditional init value, must this instead of useEffect; step 2 to refresh stay login
  const [userID, setUserID] = useState(
    localStorage.getItem("user_id") ? localStorage.getItem("user_id") : ""
  );
  const [isSignedIn, setSignedIn] = useState(!!localStorage.getItem("user_id"));
  const [userName, setUserName] = useState(
    localStorage.getItem("username") ? localStorage.getItem("username") : ""
  );

  function onSignUpSubmit({ username, password, email }, resetPage) {
    UserAccess.post("/register.php", {
      username: username,
      password: password,
      email: email,
    })
      .then(function (response) {
        if (response.data.status_code === 200) {
          setSignedIn(true);
          setUserName(username);
          setUserID(response.data.user_id);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("username", username);
          toast.success(`Welcome, ${username}`);
          history.push("/dashboard");
        } else {
          history.push("/");
          alert("Something Wrong Happened. Please Try Again.");
          resetPage();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function onSignInSubmit({ username, password }) {
    UserAccess.post("/login.php", {
      username: username,
      password: password,
    })
      .then(function (response) {
        if (response.data.status_code === 200) {
          setSignedIn(true);
          setUserName(username);
          setUserID(response.data.user_id);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("username", username);
          toast.success(`Welcome, ${username}`);
          history.push("/dashboard");
        } else {
          history.push("/");
          alert("Wrong Username/Password. Please Try Again.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // setSignedIn(true);
    // setUserID(0);
    // history.push("/dashboard");
  }

  function onLogout() {
    localStorage.clear();
    history.push("/");
    setUserID("");
    setUserName("");
    setSignedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        userID: userID,
        isSignedIn: isSignedIn,
        userName: userName,
        onSignIn: onSignInSubmit,
        onSignUp: onSignUpSubmit,
        onLogout: onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
