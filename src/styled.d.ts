import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      secondary: string;
      backgroundColor: string;
      textColor: string;
      title: string;
      border: string;
      buttonText: string;
    };
  }
}
