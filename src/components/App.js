import { Box, Container, CssBaseline } from "@material-ui/core";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import React from "react";
import { HashRouter } from "react-router-dom";
import { UserAuthProvider } from "../contexts/UserAuthProvider";
import AppRoute from "../pages/AppRoute";
import "../styles/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1100,
      xl: 2000,
    },
  },
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function App() {
  const classes = useStyles();

  return (
    <HashRouter>
      <UserAuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box className={classes.root}>
            <Container maxWidth="xl">
              <AppRoute />
              <ToastContainer />
            </Container>
          </Box>
        </ThemeProvider>
      </UserAuthProvider>
    </HashRouter>
  );
}

export default App;
