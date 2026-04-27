
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const ButtonSpinner = styled.div<{ $isFollowing: boolean }>`
  width: 16px;
  height: 16px;
  /* Usamos propriedades separadas para evitar o conflito do React */
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.$isFollowing ? "#1d9bf0" : "#ffffff"};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${rotate} 0.6s linear infinite;
`;