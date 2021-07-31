import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import ProductList from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RecentListPage from "./pages/RecentListPage";
import { LOCAL_STORAGE } from "./utils/constants";

LOCAL_STORAGE.set("recentList", []);

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/">
          <Redirect to="/product" />
        </Route>
        <Route exact path="/product" component={ProductList} />
        <Route path="/product/:productId" component={ProductDetailPage} />
        <Route path="/recent-list" component={RecentListPage} />
      </div>
    );
  }
}

export default App;
