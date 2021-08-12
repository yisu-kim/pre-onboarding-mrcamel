import { Col } from "antd";
import styled from "styled-components";

export const ProductListContainer = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
`;

export const CustomCol = styled(Col)`
  text-align: ${({ textalign = "left" }) => textalign};
`;
