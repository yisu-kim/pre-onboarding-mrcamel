import React, { Component } from "react";
import { ORIGINAL_DATA } from "../../utils/constants";
import { Checkbox } from "antd";

export default class BrandFilterMenu extends Component {
  state = {
    datas: [],
    checked: [],
  };

  handleToggle = (brand) => {
    const currentIndex = this.state.checked.indexOf(brand);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) newChecked.push(brand);
    else newChecked.splice(currentIndex, 1);

    this.setState({
      checked: newChecked,
    });
    this.props.handleFilters(newChecked);
  };

  render() {
    const properties = [
      { label: "나이키", value: "나이키" },
      { label: "구찌", value: "구찌" },
      { label: "스톤아일랜드", value: "스톤아일랜드" },
    ];

    return (
      <div>
        {properties.map((property) => (
          <Checkbox onChange={() => this.handleToggle(property.value)}>
            {property.label}
          </Checkbox>
        ))}
      </div>
    );
  }
}
