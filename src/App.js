import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "utils/constants/constants";
import "utils/storage/init";
import ProductList from "pages/ProductList";
import ProductDetail from "pages/ProductDetail";
import RecentList from "pages/RecentList";
import NotFound from "pages/NotFound";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Redirect to={ROUTES.PRODUCT} />
        </Route>
        <Route exact path={ROUTES.PRODUCT} component={ProductList} />
        <Route
          path={`${ROUTES.PRODUCT}/:productId`}
          component={ProductDetail}
        />
        <Route path={ROUTES.RECENT_LIST} component={RecentList} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;
