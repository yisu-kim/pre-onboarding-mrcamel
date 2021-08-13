import { Divider, Space } from "antd";
import styled from "styled-components";

const CustomSpace = styled(Space)`
  width: 100%;
  justify-content: flex-end;
`;

const CustomDivider = styled(Divider)`
  margin: 1em 0;
`;

export default {
  CustomSpace,
  CustomDivider,
};
