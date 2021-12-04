import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2, 2, 2),
    backgroundColor: theme.palette.action.hover,
  },
  infoContainer: {
    marginTop: 15,
  },
  info: {
    color: theme.palette.secondary.main,
    fontSize: 15,
    fontWeight: 500,
  },
}));

export default function BudgetProgress(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      component={Paper}
      className={classes.root}
      variant="outlined"
    >
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <LinearProgress variant="determinate" color="secondary" {...props} />
      </Grid>
      <Grid
        item
        xs={false}
        sm={false}
        md={false}
        lg={false}
        className={classes.infoContainer}
      >
        <Typography variant="body2" className={classes.info}>
          {`${Math.round(props.value)}% of Budget Spent`}
        </Typography>
      </Grid>
    </Grid>
  );
}
