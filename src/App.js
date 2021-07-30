import React, { Component } from "react";
import { Route } from "react-router-dom";
import ProductList from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RecentListPage from "./pages/RecentListPage";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={ProductList} />
        <Route path='/:productId' component={ProductDetailPage} />
        <Route path='/recent-list' component={RecentListPage} />
      </div>
    );
  }
}

export default App;
