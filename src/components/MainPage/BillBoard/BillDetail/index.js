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
import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import BudgetProportion from "../../Dashboard/BillCard/BudgetProportion";
import FavoriteOutlinedIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import UserAccess from "../../../../adapters/UserAccess";
import { toast } from "react-toastify";

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

function ajaxFavorite(id, favorite) {
  (async () => {
    const response = await UserAccess.post("/toggle-favorite.php", {
      bill_id: id,
      is_favorite: favorite,
    });

    if (response.data.status_code === 200) {
      toast.success(`${favorite ? "Added" : "Canceled"} favorite.`);
    } else if (response.data.status_code === 401) {
      toast.error(`401 response.data.message`);
    } else if (response.data.status_code === 500) {
      toast.error(`500 response.data.message`);
    } else {
      toast.error(response.data.message);
    }
  })();
}

export default function BillDetail(props) {
  const classes = useStyles();
  const match = useRouteMatch();
  const { id, date, comment, people, amount, balance, favorite } = props;
  const [isFavorite, setIsFavorite] = useState(favorite);

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
              Bill Detail
            </Typography>
            <Typography variant="h5" component="h2">
              {date}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {comment}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {`With ${people}`}
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
              $ {` ${amount}`}
            </Typography>

            <div className={classes.budgetProgress}>
              <BudgetProportion value={balance} />
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box borderBottom={2} mt={5} className={classes.border} />
          </Grid>

          <Grid item xs={1} sm={1} md={1} lg={1}>
            <Button
              startIcon={
                isFavorite ? (
                  <FavoriteOutlinedIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )
              }
              onClick={() => {
                ajaxFavorite(id, !isFavorite);
                setIsFavorite(!isFavorite);
              }}
            />
          </Grid>
        </Grid>
      </CardContent>

      <CardContent>
        <ButtonGroup variant="contained" color="secondary" fullWidth>
          <Button startIcon={<EditIcon />}>
            <Link
              to={{
                pathname: "/dashboard/editbill",
                search: `?id=${id}`,
              }}
              className={classes.routeLink}
            >
              Edit This Bill
            </Link>
          </Button>
          <Button startIcon={<DeleteForeverIcon />}>
            <Link
              to={{
                pathname: "/dashboard/removebill",
                search: `?id=${id}`,
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
