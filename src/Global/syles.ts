import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
:root{
    --primary-color: #3295b4;
    --secondary-color: #fff;
    --text-blue: #1512c1;
    --grey-clear: #e0e0e0;
}

body {
    color: ${(props) => props.theme.colors.textColor};
    font-family: Arial, Helvetica, sans-serif;
    line-height:140%;
    background-color: ${(props) => props.theme.colors.backgroundColor};
  }
h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    font-family: "Kumbh Sans", sans-serif;
    line-height: 140%;
    color: ${(props) => props.theme.colors.title};
}

img{
    max-width: 100%;
    width: 100%;
    height: auto;
    display: block;
}
`;
