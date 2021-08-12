import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  INTEREST_LIST,
  INTEREST_LIST_KEY,
  LOCAL_STORAGE,
  RECENT_LIST_KEY,
  ROUTES,
} from "utils/constants/constants";
import ProductList from "pages/ProductList";
import ProductDetail from "pages/ProductDetail";
import RecentList from "pages/RecentList";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path={ROUTES.HOME}>
          <Redirect to={ROUTES.PRODUCT} />
        </Route>
        <Route exact path={ROUTES.PRODUCT} component={ProductList} />
        <Route
          path={`${ROUTES.PRODUCT}/:productId`}
          component={ProductDetail}
        />
        <Route path={ROUTES.RECENT_LIST} component={RecentList} />
      </div>
    );
  }
}

export default App;

if (!LOCAL_STORAGE.get(INTEREST_LIST_KEY)) {
  LOCAL_STORAGE.set(INTEREST_LIST_KEY, INTEREST_LIST);
}
if (!LOCAL_STORAGE.get(RECENT_LIST_KEY)) {
  LOCAL_STORAGE.set(RECENT_LIST_KEY, []);
}
