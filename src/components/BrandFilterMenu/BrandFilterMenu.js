import React, { Component } from "react";
import { ORIGINAL_DATA } from "../../utils/constants";
import { Checkbox } from "antd";

export default class BrandFilterMenu extends Component {
  state = {
    datas: [],
    checked: [],
  };

  onSelectChange = (e) => {
    console.log(e.target.checked);
  };

  loadData = async () => {
    const data = await ORIGINAL_DATA;
    // console.log("data: ", data);
    this.setState({
      datas: data,
    });
  };

  handleToggle = (brand) => {
    const currentIndex = this.state.checked.indexOf(brand);
    const newChecked = [...this.state.checked];
    if (currentIndex === -1) newChecked.push(brand);
    else newChecked.splice(currentIndex, 1);

    console.log("newChecked: ", newChecked);
    this.setState({
      checked: newChecked,
    });
  };

  componentDidMount() {
    // console.log("이거 왜 안 나옴?");
    this.loadData();
  }

  render() {
    const properties = [
      { label: "나이키", value: "나이키" },
      { label: "구찌", value: "구찌" },
      { label: "스톤아일랜드", value: "스톤아일랜드" },
    ];

    const { datas, checked } = this.state;

    let filteredList;

    if (checked.length === 0) filteredList = datas;
    else filteredList = datas.filter((data) => checked.includes(data.brand));

    return (
      <div>
        {properties.map((property) => (
          <Checkbox
            onChange={() => this.handleToggle(property.value)}
            // checked={checked}
          >
            {property.label}
          </Checkbox>
        ))}

        <ul style={{ fontSize: "20px" }}>
          {filteredList?.map((data) => (
            <li>{data.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
