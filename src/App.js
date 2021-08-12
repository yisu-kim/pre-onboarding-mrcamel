import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  INTEREST_LIST,
  LOCAL_STORAGE,
  ROUTES,
  STORAGE_KEYS,
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

if (!LOCAL_STORAGE.get(STORAGE_KEYS.INTEREST_LIST)) {
  LOCAL_STORAGE.set(STORAGE_KEYS.INTEREST_LIST, INTEREST_LIST);
}
if (!LOCAL_STORAGE.get(STORAGE_KEYS.RECENT_LIST)) {
  LOCAL_STORAGE.set(STORAGE_KEYS.RECENT_LIST, []);
}
