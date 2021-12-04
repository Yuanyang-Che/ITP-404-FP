import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DescriptionIcon from "@material-ui/icons/Description";
import EditIcon from "@material-ui/icons/Edit";
import ListIcon from "@material-ui/icons/List";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { AuthContext } from "../../contexts/UserAuthProvider";
import DashboardRoute from "../../pages/DashboardRoute";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.secondary.dark,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 30,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5, "5vh", 0, "5vh"),
  },
  card: {
    width: "100%",
    padding: theme.spacing(1),
  },
  routeLink: {
    color: "inherit",
    textDecoration: "inherit",
  },

  selected: {
    color: "lightblue",
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const theme = useTheme();
  //Control if sidebar is open or not
  const [open, setOpen] = useState(false);
  //Control highlight of clicked sidebar

  const pageEnum = {
    Dashboard: 0,
    Billboard: 1,
    AddNewBill: 2,
    DebtBoard: 3,
    EditDebt: 4,
    EditBudget: 5,
  };
  Object.freeze(pageEnum);

  const [currPage, setCurrPage] = useState(pageEnum.Dashboard);

  const match = useRouteMatch();

  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!authContext.isSignedIn) {
      history.push("/");
    }
  });

  const onDrawerOpen = () => {
    setOpen(true);
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <ListIcon style={{ fontSize: 30 }} />
          </IconButton>
          <Typography variant="h6" align={"left"}>
            <Link to={match.path} className={classes.routeLink} replace>
              Budget Manager
            </Link>
          </Typography>
          {authContext.isSignedIn && (
            <Typography variant="h6" style={{ marginLeft: "auto" }}>
              <>Hi, {authContext.userName}</>
              <Button
                variant="outlined"
                onClick={() => {
                  authContext.onLogout();
                  alert("Logout");
                }}
              >
                Logout
              </Button>
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={onDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link
            to={match.path}
            className={clsx(classes.routeLink, {
              [classes.selected]: currPage === pageEnum.Dashboard,
            })}
            replace
          >
            <ListItem
              button
              onClick={() => {
                setCurrPage(pageEnum.Dashboard);
              }}
            >
              <ListItemIcon>
                <DashboardIcon
                  color={
                    currPage === pageEnum.Dashboard ? "primary" : undefined
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link
            to={`${match.path}/billboard`}
            className={clsx(classes.routeLink, {
              [classes.selected]: currPage === pageEnum.Billboard,
            })}
            replace
          >
            <ListItem
              button
              onClick={() => {
                setCurrPage(pageEnum.Billboard);
              }}
            >
              <ListItemIcon>
                <DescriptionIcon
                  color={
                    currPage === pageEnum.Billboard ? "primary" : undefined
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Bills Tracking" />
            </ListItem>
          </Link>
          <Link
            to={`${match.path}/addnewbill`}
            className={clsx(classes.routeLink, {
              [classes.selected]: currPage === pageEnum.AddNewBill,
            })}
            replace
          >
            <ListItem
              button
              onClick={() => {
                setCurrPage(pageEnum.AddNewBill);
              }}
            >
              <ListItemIcon>
                <AddBoxIcon
                  color={
                    currPage === pageEnum.AddNewBill ? "primary" : undefined
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Add New Bill" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link
            to={`${match.path}/debtboard`}
            className={clsx(classes.routeLink, {
              [classes.selected]: currPage === pageEnum.DebtBoard,
            })}
            replace
          >
            <ListItem
              button
              onClick={() => {
                setCurrPage(pageEnum.DebtBoard);
              }}
            >
              <ListItemIcon>
                <AccountBalanceIcon
                  color={
                    currPage === pageEnum.DebtBoard ? "primary" : undefined
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Debts Tracking" />
            </ListItem>
          </Link>
          <Link
            to={`${match.path}/editdebt`}
            className={clsx(classes.routeLink, {
              [classes.selected]: currPage === pageEnum.EditDebt,
            })}
            replace
          >
            <ListItem
              button
              onClick={() => {
                setCurrPage(pageEnum.EditDebt);
              }}
            >
              <ListItemIcon>
                <EditIcon
                  color={currPage === pageEnum.EditDebt ? "primary" : undefined}
                />
              </ListItemIcon>
              <ListItemText primary="Edit Debt" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link
            to={`${match.path}/editbudget`}
            className={clsx(classes.routeLink, {
              [classes.selected]: currPage === pageEnum.EditBudget,
            })}
            replace
          >
            <ListItem
              button
              onClick={() => {
                setCurrPage(pageEnum.EditBudget);
              }}
            >
              <ListItemIcon>
                <AccountBalanceWalletIcon
                  color={
                    currPage === pageEnum.EditBudget ? "primary" : undefined
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Manage Budget" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>

      <div className={classes.content}>
        <div className={classes.toolbar} />
        <DashboardRoute />
      </div>
    </div>
  );
}
