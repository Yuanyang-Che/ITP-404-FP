import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import UserAccess from "../../../../adapters/UserAccess";
import { AuthContext } from "../../../../contexts/UserAuthProvider";
import BudgetProgress from "./BudgetProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    padding: theme.spacing(1.5, 2, 1.5, 1.5),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    marginBottom: 12,
  },
  budgetNum: {
    marginTop: 0,
    color: theme.palette.info.dark,
    fontWeight: 500,
  },
  budgetProgress: {
    marginTop: 15,
    width: "100%",
  },
  pos: {
    marginTop: 5,
    marginBottom: 12,
  },
  border: {
    borderColor: theme.palette.action.disabled,
  },
  actionBorder: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: theme.palette.action.disabled,
  },
  routeLink: {
    color: "inherit",
    textDecoration: "inherit",
  },
}));

export default function BudgetCard() {
  const classes = useStyles();
  const match = useRouteMatch();
  const authContext = useContext(AuthContext);
  const [budget, setBudget] = useState("Loading...");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // TODO: Run all AJAX together to avoid duplicate render
    (async () => {
      const response = await UserAccess.post("/get-budget.php", {
        user_id: authContext.userID,
      });

      if (response.data.status_code === 200) {
        setBudget(`$ ${response.data.budget.toFixed(2)}`);
      } else if (response.data.status_code === 401) {
        setBudget("No Budget");
      } else {
        alert("Budget Loading Error. Please Reload Page.");
      }

      const bill_response = await UserAccess.post("/get-total-bill.php", {
        user_id: authContext.userID,
      });

      if (bill_response.data.status_code === 200) {
        if (response.data.budget) {
          setBalance(
            (
              (bill_response.data.total_bill / response.data.budget) *
              100
            ).toFixed(2)
          );
        }
      } else if (bill_response.data.status_code === 401) {
        console.log(authContext);
        alert(
          `Budget Card get-total-bill id=${authContext.userID}` +
            bill_response.data.message
        );
      } else {
        setBalance(0);
      }
    })();
  }, [authContext.userID]);

  return (
    <Card className={classes.root} raised>
      <CardContent>
        <Grid container>
          <Grid item xs={false} sm={false} md={false} lg={5}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Your Budget Tracking
            </Typography>
            <Typography variant="h5" component="h2">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Updated{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={true}>
            <Box borderBottom={2} mt={2} mb={2} className={classes.border} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={7}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Current Budget
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              className={classes.budgetNum}
            >
              {budget}
            </Typography>
            <div className={classes.budgetProgress}>
              <BudgetProgress value={balance} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box borderBottom={2} mt={5} className={classes.border} />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <ButtonGroup variant="contained" color="secondary" fullWidth>
          <Button startIcon={<EditIcon />}>
            <Link to={`${match.path}editbudget`} className={classes.routeLink}>
              Add New Current Month Budget
            </Link>
          </Button>
          <Button startIcon={<TrendingUpIcon />}>
            <Link to={`${match.path}editbudget`} className={classes.routeLink}>
              Edit Current Month Budget Target
            </Link>
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
