import { Component } from 'react';
import { Card, Row } from 'antd';
import BrandFilter from 'components/BrandFilter';
import DislikeFilter from 'components/DislikeFilter';
import SortingFilter from 'components/SortingFilter';
import style from './FilterBarStyle';

type FilterBarProps = {
  handleBrandFilters: (brands: string[]) => void;
  handleDislikeFilter: (checked: boolean) => void;
  handleSortingFilter: (selected: string) => void;
};

class FilterBar extends Component<FilterBarProps> {
  render(): JSX.Element {
    return (
      <Card>
        <Row>
          <BrandFilter handleBrandFilters={this.props.handleBrandFilters} />
          <CustomDivider />
          <CustomSpace>
            <DislikeFilter
              handleDislikeFilter={this.props.handleDislikeFilter}
            />
            <SortingFilter
              handleSortingFilter={this.props.handleSortingFilter}
            />
          </CustomSpace>
        </Row>
      </Card>
    );
  }
}

export default FilterBar;

const { CustomSpace, CustomDivider } = style;
