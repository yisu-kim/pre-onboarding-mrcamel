import { Component } from 'react';
import { Select } from 'antd';
import { ORDER_BY } from 'utils/constants/constants';

type SortingFilterProps = {
  handleSortingFilter: (value: string) => void;
};

class SortingFilter extends Component<SortingFilterProps> {
  render(): JSX.Element {
    return (
      <Select
        defaultValue={ORDER_BY.VIEW}
        onChange={this.props.handleSortingFilter}
      >
        <Select.Option value={ORDER_BY.VIEW}>최근 조회 순</Select.Option>
        <Select.Option value={ORDER_BY.PRICE}>낮은 가격 순</Select.Option>
      </Select>
    );
  }
}

export default SortingFilter;
