import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserAccess from "../../../adapters/UserAccess";
import { AuthContext } from "../../../contexts/UserAuthProvider";
import BillDetail from "./BillDetail";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: theme.spacing(1),
  },
}));

export default function BillBoard() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [billList, setBillList] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    document.title = "Bill Board";
    (async () => {
      const response = await UserAccess.post("/get-all-bill.php", {
        user_id: authContext.userID,
      });

      if (response.data.status_code === 200) {
        setBillList(response.data.bills);
      } else if (response.data.status_code === 500) {
        setBillList([]);
      } else {
        alert(
          `billboard ${response.data.message} user_id=${authContext.userID}`
        );
        console.log(authContext);
        history.push("/");
      }

      const budget_response = await UserAccess.post("/get-budget.php", {
        user_id: authContext.userID,
      });

      if (budget_response.data.status_code === 200) {
        setBudget(budget_response.data.budget);
      } else if (budget_response.data.status_code === 401) {
        setBudget(0);
      }
    })();
  }, [authContext, authContext.userID, history]);

  const getBillList = () => {
    const bills = billList.map((element) => {
      let balance;
      if (budget !== 0) {
        balance = ((element.amount / budget) * 100).toFixed(2);
      } else {
        balance = 0;
      }

      const prop = {
        id: element.id,
        date: new Date(element.date).toUTCString().substr(0, 16),
        comment: element.comment,
        people: element.people,
        amount: element.amount.toFixed(2),
        balance: balance,
        favorite: element.favorite,
      };

      return (
        <Grid item className={classes.card} xs={12} sm={12} md={12} lg={6}>
          <BillDetail {...prop} />
        </Grid>
      );
    });

    return bills;
  };

  return (
    <Grid container>
      <Grid item className={classes.card} xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h4" noWrap gutterBottom>
          Your Bills Tracking
        </Typography>
      </Grid>
      {getBillList()}
    </Grid>
  );
}
