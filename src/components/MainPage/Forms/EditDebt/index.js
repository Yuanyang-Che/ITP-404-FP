import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
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

export default function EditDebt() {
  const [input, setInput] = useState({
    amount: "",
    people: "",
  });
  const [userList, setUserList] = useState([]);
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const { search } = useLocation();

  const debtID = new URLSearchParams(search).get("id"); // Reserve for refactor

  useEffect(() => {
    document.title = "Edit Debt";
    if (debtID) {
      (async () => {
        const response = await UserAccess.post("/get-debt.php", {
          debt_id: debtID,
        });

        if (response.data.status_code === 200) {
          setInput({
            //amount: response.data.debt.amount,
            people: response.data.debt.receiver_id,
          });
        } else {
          alert(`Edit Debt get-debt` + response.data.message);
          history.push("/");
        }
      })();
    }

    (async () => {
      const response = await UserAccess.post("/all-user.php");

      if (response.data.status_code === 200) {
        setUserList(response.data.users);
      } else {
        alert(response.data.message);
        history.push("/");
      }
    })();
  }, [authContext.userID, debtID, history]);

  const getUserList = () => {
    const users = userList
      .filter((element) => {
        return element[0] !== authContext.userID;
      })
      .map((element) => {
        return (
          <MenuItem value={element[0]} selected={element[0] === input.people}>
            {element[1]}
          </MenuItem>
        );
      });

    return users;
  };

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
      people: "",
      comment: "",
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const response = await UserAccess.post("/add-debt.php", {
        payer_id: authContext.userID,
        receiver_id: input.people,
        amount: input.amount,
      });

      if (response.data.status_code === 200) {
        history.push("/dashboard/debtboard");
      } else {
        alert("EditDebt add-debt " + response.data.message);
      }
    })();
  };

  return (
    <div className={classes.paper}>
      <Paper className={classes.paperContent} elevation={24}>
        <Avatar className={classes.avatar}>
          <CreditCardIcon style={{ fontSize: 55 }} />
        </Avatar>
        <Typography component="h1" variant="h4">
          Edit Debt Relations
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
              labelWidth={60}
              color="secondary"
              name="amount"
              required
            />
          </FormControl>
          <FormControl className={classes.margin} fullWidth variant="outlined">
            <InputLabel id="select-outlined-label" color="secondary">
              Debt Person
            </InputLabel>
            <Select
              labelId="select-outlined-label"
              id="select-outlined"
              value={input.people}
              name="people"
              onChange={(e) => onInputChange(e)}
              label="Debt Person"
              color="secondary"
              required
            >
              {getUserList()}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Edit!
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
