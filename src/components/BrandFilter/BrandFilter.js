import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, Collapse } from "antd";
import { UNIQUE_BRAND } from "utils/constants/constants";

export default class BrandFilter extends Component {
  state = {
    datas: [],
    checked: [],
  };

  static propTypes = {
    handleBrandFilters: PropTypes.func,
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
    const properties = UNIQUE_BRAND;

    return (
      <div>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Brands" key="1">
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

const { Panel } = Collapse;
