import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { INTEREST_LIST, LOCAL_STORAGE } from "utils/constants/constants";
import ProductListPage from "pages/ProductListPage";
import ProductDetailPage from "pages/ProductDetailPage";
import RecentListPage from "pages/RecentListPage";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/">
          <Redirect to="/product" />
        </Route>
        <Route exact path="/product" component={ProductListPage} />
        <Route path="/product/:productId" component={ProductDetailPage} />
        <Route path="/recent-list" component={RecentListPage} />
      </div>
    );
  }
}

export default App;

if (!LOCAL_STORAGE.get("interestList")) {
  LOCAL_STORAGE.set("interestList", INTEREST_LIST);
}
if (!LOCAL_STORAGE.get("recentList")) {
  LOCAL_STORAGE.set("recentList", []);
}
