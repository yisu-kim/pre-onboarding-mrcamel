import { Card, Col } from "antd";
import styled from "styled-components";

export const DetailPageContainer = styled.div`
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
`;

export const DescriptionContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DescriptionContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 12px;
`;

export const DescriptionFollowers = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
`;

export const CustomCol = styled(Col)`
  text-align: ${({ textalign = "left" }) => textalign};
`;

export const CustomCard = styled(Card)`
  height: 100%;
`;

export const ProductImg = styled.img`
  width: 400px;
`;
