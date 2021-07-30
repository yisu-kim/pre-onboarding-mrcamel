import React, { Component } from "react";
import BrandFilterMenu from "../components/BrandFilterMenu/BrandFilterMenu";
import DislikeFilter from "../components/DislikeFilter";
import { ORIGINAL_DATA } from "../utils/constants";

export default class RecentListPage extends Component {
  state = {
    datas: [],
    checked: [],
  };

  loadData = async () => {
    const data = await ORIGINAL_DATA;
    this.setState({
      datas: data,
    });
  };

  handleFilters = (checked) => {
    this.setState({
      checked: checked,
    });
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { datas, checked } = this.state;
    let filteredList;

    if (checked.length === 0) filteredList = datas;
    else filteredList = datas.filter((data) => checked.includes(data.brand));
    return (
      <div>
        <div>
          <DislikeFilter />
          <BrandFilterMenu handleFilters={this.handleFilters} />
        </div>

        <ul style={{ fontSize: "20px" }}>
          {filteredList?.map((data) => (
            <li>{data.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
