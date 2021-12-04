import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserAccess from "../../../adapters/UserAccess";
import { AuthContext } from "../../../contexts/UserAuthProvider";
import DebtDetail from "./DebtDetail";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: theme.spacing(1),
  },
}));

export default function DebtBoard() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [debtList, setDebtList] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect(() => {
    document.title = "Debt Board";
    (async () => {
      const response = await UserAccess.post("/get-all-debt.php", {
        user_id: authContext.userID,
      });

      if (response.data.status_code === 200) {
        setDebtList(response.data.debts);
      } else if (response.data.status_code === 500) {
        setDebtList([]);
      } else {
        alert("debtboard get-all-debt" + response.data.message);
        history.push("/");
      }

      const totalDebt_response = await UserAccess.post("/get-total-debt.php", {
        user_id: authContext.userID,
      });

      if (totalDebt_response.data.status_code === 200) {
        setTotalDebt(totalDebt_response.data.total_debt);
      } else if (totalDebt_response.data.status_code === 500) {
        setTotalDebt(0);
      } else {
        alert("debtboard get-total-debt" + response.data.message);
      }
    })();
  }, [authContext.userID, history]);

  const getDebtList = () => {
    const debts = debtList.map((element) => {
      let balance;
      if (totalDebt !== 0) {
        balance = ((element.amount / totalDebt) * 100).toFixed(2);
      } else {
        balance = 0;
      }

      const prop = {
        id: element.id,
        amount: element.amount.toFixed(2),
        username: element.username,
        balance: balance,
      };

      return (
        <Grid item className={classes.card} xs={12} sm={12} md={12} lg={6}>
          <DebtDetail {...prop} />
        </Grid>
      );
    });

    return debts;
  };

  return (
    <Grid container>
      <Grid item className={classes.card} xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h4" noWrap gutterBottom>
          Your Debts Tracking
        </Typography>
      </Grid>
      {getDebtList()}
    </Grid>
  );
}
