
import { light } from "../themes/light"
type Theme = typeof light

declare module "styled-components" {
  export interface DefaultTheme extends Theme {
    colors: {
      primary: string;
      secondary: string;
      backgroundColor: string;
      textColor: string;
      title: string;
      border: string;
    };
  }
}