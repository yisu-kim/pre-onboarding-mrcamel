import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  INTEREST_LIST,
  INTEREST_LIST_KEY,
  LOCAL_STORAGE,
  RECENT_LIST_KEY,
  ROUTES,
} from "utils/constants/constants";
import ProductListPage from "pages/ProductListPage";
import ProductDetailPage from "pages/ProductDetailPage";
import RecentListPage from "pages/RecentListPage";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path={ROUTES.HOME}>
          <Redirect to={ROUTES.PRODUCT} />
        </Route>
        <Route exact path={ROUTES.PRODUCT} component={ProductListPage} />
        <Route
          path={`${ROUTES.PRODUCT}/:productId`}
          component={ProductDetailPage}
        />
        <Route path={ROUTES.RECENT_LIST} component={RecentListPage} />
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
