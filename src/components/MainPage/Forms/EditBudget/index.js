import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserAccess from "../../../../adapters/UserAccess";
import { AuthContext } from "../../../../contexts/UserAuthProvider";
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

export default function EditBudget() {
  const [input, setInput] = useState({
    amount: "",
  });
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    document.title = "Edit Budget";
    (async () => {
      const response = await UserAccess.post("/get-budget.php", {
        user_id: authContext.userID,
      });
      if (response.data.status_code === 200) {
        setInput({
          amount: response.data.budget,
        });
      } else {
        alert(response.data.message);
        history.push("/");
      }
    })();
  });

  const onInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onFormReset = () => {
    setInput({
      amount: "",
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const response = await UserAccess.post("/edit-budget.php", {
        user_id: authContext.userID,
        budget: input.amount,
      });

      if (response.data.status_code === 200) {
        toast.success(`Budget Update Success.`);
        //toast.success(`Your budget is now ${input.amount}`);
        history.push("/dashboard");
      } else {
        alert("Edit Budge edit-budget " + response.data.message);
      }
    })();
  };

  return (
    <div className={classes.paper}>
      <Paper className={classes.paperContent} elevation={24}>
        <Avatar className={classes.avatar}>
          <TrackChangesIcon style={{ fontSize: 60 }} />
        </Avatar>
        <Typography component="h1" variant="h4">
          Edit Budget
        </Typography>
        <form className={classes.form} onSubmit={onFormSubmit}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-amount"
              color="secondary"
              required
            >
              Amount
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={input.amount}
              onChange={(e) => onInputChange(e)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={70}
              color="secondary"
              name="amount"
              type="number"
              required
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Edit Budget!
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            className={classes.submit}
            onClick={() => onFormReset()}
          >
            Reset
          </Button>
        </form>
      </Paper>
    </div>
  );
}
