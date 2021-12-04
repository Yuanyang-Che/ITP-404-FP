import DateFnsUtils from "@date-io/date-fns";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ReceiptIcon from "@material-ui/icons/Receipt";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import React, { useEffect, useState } from "react";
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

export default function EditBill() {
  const [input, setInput] = useState({
    amount: "",
    comment: "",
    people: "",
  });
  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();
  const history = useHistory();
  const { search } = useLocation();

  const billID = new URLSearchParams(search).get("id");

  useEffect(() => {
    document.title = "Edit Bill";

    (async () => {
      const response = await UserAccess.post("/get-bill.php", {
        bill_id: billID,
      });
      if (response.data.status_code === 200) {
        // {
        //   "id": 10,
        //     "amount": 44,
        //     "payer_id": 1,
        //     "comment": null,
        //     "people": null,
        //     "date": "2021-12-03",
        //     "favorite": 1
        // }
        setInput({
          amount: response.data.bill.amount,
          comment: response.data.bill.comment,
          people: response.data.bill.people,
        });
        handleDateChange(response.data.bill.date);
      } else {
        alert(response.data.message);
        history.push("/");
      }
    })();
  }, []);

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
      comment: "",
      people: "",
    });
    handleDateChange(new Date());
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const response = await UserAccess.post("/edit-bill.php", {
        bill_id: billID,
        amount: input.amount,
        comment: input.comment,
        people: input.people,
        date: new Date(selectedDate).toISOString().substr(0, 10),
      });

      if (response.data.status_code === 200) {
        toast.success(`Bill Update Success.`);
        history.push("/dashboard/billboard");
      } else if (response.data.status_code === 500) {
        alert("Editbill edit-bill 500" + response.data.message);
      } else if (response.data.status_code === 401) {
        alert("Editbill edit-bill 401" + response.data.message);
      }
    })();
  };

  return (
    <div className={classes.paper}>
      <Paper className={classes.paperContent} elevation={24}>
        <Avatar className={classes.avatar}>
          <ReceiptIcon style={{ fontSize: 45 }} />
        </Avatar>
        <Typography component="h1" variant="h4">
          Edit This Bill
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
              type="number"
              required
            />
          </FormControl>
          <FormControl className={classes.margin} variant="outlined">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="Bill Time"
                format="MM/dd/yyyy"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => handleDateChange(date)}
                color="secondary"
                required
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <TextField
              id="outlined-multiline-static"
              label="Bill Comments"
              multiline
              rows={3}
              variant="outlined"
              name="comment"
              placeholder="e.g. location etc."
              color="secondary"
              value={input.comment}
              onChange={(e) => onInputChange(e)}
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <TextField
              variant="outlined"
              name="people"
              label="People Together"
              type="text"
              id="people"
              color="secondary"
              placeholder="e.g. John, Jane"
              value={input.people}
              onChange={(e) => onInputChange(e)}
            />
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
