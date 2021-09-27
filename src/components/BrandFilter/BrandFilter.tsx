import { Component } from 'react';
import { Checkbox } from 'antd';
import { UNIQUE_BRAND } from 'utils/constants/constants';

type BrandFilterProps = {
  handleBrandFilters: (newChecked: string[]) => void;
};

type BrandFilterState = {
  checked: string[];
};

class BrandFilter extends Component<BrandFilterProps, BrandFilterState> {
  state: BrandFilterState = {
    checked: [],
  };

  handleToggle = (brand: string): void => {
    const currentIndex = this.state.checked.indexOf(brand);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) {
      newChecked.push(brand);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
    this.props.handleBrandFilters(newChecked);
  };

  render(): JSX.Element {
    const properties = UNIQUE_BRAND;

    return (
      <>
        {properties.map((property, index) => (
          <Checkbox
            key={index}
            onChange={() => this.handleToggle(property.value)}
          >
            {property.label}
          </Checkbox>
        ))}
      </>
    );
  }
}

export default BrandFilter;
