import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import BillCard from "./BillCard";
import BudgetCard from "./BudgetCard";
import DebtCard from "./DebtCard";
import RelationCard from "./RelationCard";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    padding: theme.spacing(1),
  },
}));

// TODO: Pass budget as prop to avoid duplicate AJAX call
export default function Dashboard() {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Dash Board";
  });

  return (
    <Grid container>
      <Grid item className={classes.card} xs={12} sm={12} md={12} lg={6}>
        <BudgetCard />
      </Grid>
      <Grid item className={classes.card} xs={12} sm={12} md={12} lg={6}>
        <BillCard />
      </Grid>
      <Grid item className={classes.card} xs={12} sm={12} md={12} lg={6}>
        <DebtCard />
      </Grid>
      <Grid item className={classes.card} xs={12} sm={12} md={12} lg={6}>
        <RelationCard />
      </Grid>
    </Grid>
  );
}
