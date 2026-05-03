import styled from "styled-components";

export const FormattedText = styled.code`
  font-family: "Fira Code", monospace; 
  padding: 2px 4px;
  font-size: 0.9em;
  color: ${(props) => props.theme.colors.primary};
`;
