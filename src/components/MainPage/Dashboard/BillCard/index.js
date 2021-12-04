import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import QueueIcon from "@material-ui/icons/Queue";
import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import UserAccess from "../../../../adapters/UserAccess";
import { AuthContext } from "../../../../contexts/UserAuthProvider";
import BudgetProportion from "./BudgetProportion";

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
  const [billInfo, setBillInfo] = useState({
    bill_id: "",
    bill_amount: "Loading...",
    date: "Loading...",
    comment: "",
  });
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await UserAccess.post("/get-current-bill.php", {
        user_id: authContext.userID,
      });

      if (response.data.status_code === 200) {
        setBillInfo({
          bill_id: response.data.bill_id,
          bill_amount: response.data.bill_amount.toFixed(2),
          date: new Date(response.data.date).toUTCString().substr(0, 16),
          comment: response.data.comment,
        });
      } else if (response.data.status_code === 500) {
        setBillInfo({
          bill_amount: "No Bill Available",
          date: "Please Add New Bill",
          comment: "",
        });
      } else {
        alert("Billcard get-current-bill " + response.data.message);
      }

      const budget_response = await UserAccess.post("/get-budget.php", {
        user_id: authContext.userID,
      });

      if (budget_response.data.status_code === 200) {
        if (response.data.bill_amount) {
          setBalance(
            (
              (response.data.bill_amount / budget_response.data.budget) *
              100
            ).toFixed(2)
          );
        }
      } else if (budget_response.data.status_code === 401) {
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
              Most Recent Bill
            </Typography>
            <Typography variant="h5" component="h2">
              {billInfo.date}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {billInfo.comment}
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
              Bill Amount
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              className={classes.budgetNum}
            >
              $ {` ${billInfo.bill_amount}`}
            </Typography>
            <div className={classes.budgetProgress}>
              <BudgetProportion value={balance} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box borderBottom={2} mt={5} className={classes.border} />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <ButtonGroup variant="contained" color="secondary" fullWidth>
          <Button startIcon={<QueueIcon />}>
            <Link to={`${match.path}/addnewbill`} className={classes.routeLink}>
              Add a New Bill
            </Link>
          </Button>
          <Button startIcon={<EditIcon />}>
            <Link
              to={{
                pathname: `${match.path}/editbill`,
                search: `?id=${billInfo.bill_id}`,
              }}
              className={classes.routeLink}
            >
              Edit This Bill
            </Link>
          </Button>
          <Button startIcon={<DeleteForeverIcon />}>
            <Link
              to={{
                pathname: `${match.path}/removebill`,
                search: `?id=${billInfo.bill_id}`,
              }}
              className={classes.routeLink}
            >
              Remove This Bill
            </Link>
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
