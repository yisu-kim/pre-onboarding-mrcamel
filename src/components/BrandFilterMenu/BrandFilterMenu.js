/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { Checkbox, Collapse } from "antd";
import { getUniqueBrand } from "../../utils/getUniqueBrand";
const { Panel } = Collapse;

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
    this.props.handleBrandFilters(newChecked);
  };

  render() {
    const properties = getUniqueBrand();

    return (
      <div>
        <Collapse defaultActiveKey={["1"]}>
          <Panel style={panelStyle} header="Brands" key="1">
            {properties.map((property, index) => (
              <Checkbox
                key={index}
                onChange={() => this.handleToggle(property.value)}
              >
                {property.label}
              </Checkbox>
            ))}
          </Panel>
        </Collapse>
      </div>
    );
  }
}

const panelStyle = {
  marginBottom: "10px",
};
