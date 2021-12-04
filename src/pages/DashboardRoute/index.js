import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import BillBoard from "../../components/MainPage/BillBoard";
import Dashboard from "../../components/MainPage/Dashboard";
import DebtBoard from "../../components/MainPage/DebtBoard";
import EditBill from "../../components/MainPage/Forms/EditBill";
import EditBudget from "../../components/MainPage/Forms/EditBudget";
import EditDebt from "../../components/MainPage/Forms/EditDebt";
import NewBill from "../../components/MainPage/Forms/NewBill";
// import NewBudget from "../../components/MainPage/Forms/NewBudget";
// import NewDebt from "../../components/MainPage/Forms/NewDebt";
import RemoveBill from "../../components/MainPage/Forms/RemoveBill";
// import RemoveDebt from "../../components/MainPage/Forms/RemoveDebt";
import NotFound from "../../components/MainPage/NotFound";
import { ToastContainer } from "react-toastify";

const DashboardRoute = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/addnewbill`} component={NewBill} />
      <Route exact path={`${match.path}/editbill`} component={EditBill} />
      <Route exact path={`${match.path}/editbudget`} component={EditBudget} />
      <Route exact path={`${match.path}/editdebt`} component={EditDebt} />
      <Route exact path={`${match.path}/removebill`} component={RemoveBill} />
      <Route exact path={`${match.path}/billboard`} component={BillBoard} />
      <Route exact path={`${match.path}/debtboard`} component={DebtBoard} />
      <Route exact path={`${match.path}/:s`} component={NotFound} />
      <Route excat path={`${match.path}/`} component={Dashboard} />
      <Redirect to={`${match.path}/`} />
    </Switch>
  );
};

export default DashboardRoute;
