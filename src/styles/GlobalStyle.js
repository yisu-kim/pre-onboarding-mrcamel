import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import antd from "antd/dist/antd.css";

export const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing : border-box;
}
*, html, body {
  font-size : 10px;
  font-family: 'Noto Sans KR', sans-serif;
}
a {
  color: inherit;
  text-decoration: none;
}
input, button {
  background-color: transparent;
  border: none;
  outline: none;
}
ol, ul, li {
  list-style: none;
}
${antd}
`;
