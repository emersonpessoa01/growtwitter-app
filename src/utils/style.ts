import styled from "styled-components";

export const FormattedText = styled.span`
  color: ${(props) => props.theme.colors.primaryHover};
  font-family: monospace;
  font-weight: bold;
  padding: 0 4px;
`;