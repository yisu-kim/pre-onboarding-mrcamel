import { Component } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type DislikeFilterProps = {
  handleDislikeFilter: (checked: boolean) => void;
};

class DislikeFilter extends Component<DislikeFilterProps> {
  handleCheckbox = (event: CheckboxChangeEvent): void => {
    this.props.handleDislikeFilter(event.target.checked);
  };

  render(): JSX.Element {
    return (
      <Checkbox onChange={this.handleCheckbox}>관심없는 상품 숨기기</Checkbox>
    );
  }
}

export default DislikeFilter;
