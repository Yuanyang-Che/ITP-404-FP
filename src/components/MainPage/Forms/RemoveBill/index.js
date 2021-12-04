import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MoneyOffIcon from "@material-ui/icons/MoneyOffRounded";
import "date-fns";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserAccess from "../../../../adapters/UserAccess";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    margin: theme.spacing(0, "3vh", 5, "3vh"),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "1600px",
  },
  paperContent: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.info.main,
    width: 65,
    height: 65,
  },
  form: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  submit: {
    margin: theme.spacing(1.5, 0, 1.5),
  },
  extra: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  border: {
    borderColor: theme.palette.secondary.dark,
  },
  margin: {
    margin: theme.spacing(2, 0, 2, 0),
  },
}));

export default function RemoveBill() {
  const classes = useStyles();
  const history = useHistory();
  const { search } = useLocation();

  const billID = new URLSearchParams(search).get("id");

  useEffect(() => {
    document.title = "Remove Bill";
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const response = await UserAccess.post("/remove-bill.php", {
        bill_id: billID,
      });

      if (response.data.status_code === 200) {
        history.push("/dashboard/billboard");
        toast.success(`Remove Bill Success.`);
      } else {
        alert("removebill remove-bill " + response.data.message);
      }
    })();
  };

  return (
    <div className={classes.paper}>
      <Paper className={classes.paperContent} elevation={24}>
        <Avatar className={classes.avatar}>
          <MoneyOffIcon style={{ fontSize: 60 }} />
        </Avatar>
        <Typography component="h1" variant="h4">
          Remove Bill
        </Typography>
        <form className={classes.form} onSubmit={onFormSubmit}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Remove!
          </Button>
        </form>
      </Paper>
    </div>
  );
}
