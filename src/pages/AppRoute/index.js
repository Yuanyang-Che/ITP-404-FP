import { Redirect, Route, Switch } from "react-router";
import MainPage from "../../components/MainPage";
import UserAccess from "../../components/UserAccess";
import NotFound from "../../components/MainPage/NotFound";

const AppRoute = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={MainPage} />
      <Route path="/404" component={NotFound} />
      <Route path="/" component={UserAccess} />
      <Redirect to="/404" />
    </Switch>
  );
};

export default AppRoute;
