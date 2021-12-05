import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import UserAccess from "../../../../adapters/UserAccess";
import { AuthContext } from "../../../../contexts/UserAuthProvider";
import DebtProgress from "./DebtProgress";

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
  const [debtInfo, setDebtInfo] = useState({
    id: "",
    username: "Loading...",
    amount: "Loading...",
  });
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await UserAccess.post("/get-highest-debt.php", {
        user_id: authContext.userID,
      });

      if (response.data.status_code === 200) {
        setDebtInfo({
          id: response.data.id,
          username: response.data.username,
          amount: response.data.amount.toFixed(2),
        });
      } else if (response.data.status_code === 500) {
        setDebtInfo({
          username: "No Debt Relations",
          amount: "Please Add New Debt",
        });
      } else {
        alert("relationcard get-highest-debt " + response.data.message);
      }

      const totalDebt_response = await UserAccess.post("/get-total-debt.php", {
        user_id: authContext.userID,
      });

      if (totalDebt_response.data.status_code === 200) {
        if (response.data.amount) {
          setBalance(
            (
              (response.data.amount / totalDebt_response.data.total_debt) *
              100
            ).toFixed(2)
          );
        }
      } else if (totalDebt_response.data.status_code === 500) {
        setBalance(0);
      } else {
        alert("relationcard get-total-debt " + totalDebt_response.data.message);
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
              Highest Debt Relation
            </Typography>
            <Typography variant="h5" component="h2">
              {debtInfo.username}
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
              Debt Amount
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              className={classes.budgetNum}
            >
              $ {` ${debtInfo.amount}`}
            </Typography>
            <div className={classes.budgetProgress}>
              <DebtProgress value={balance} />
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
            <Link
              to={{
                pathname: `${match.path}editdebt`,
                search: `?id=${debtInfo.id}`,
              }}
              className={classes.routeLink}
            >
              Edit This Person's Debt
            </Link>
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
