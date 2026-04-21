import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) =>
    props.theme.colors.backgroundColor};
`;

export const StyledSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${(props) => props.theme.colors.border};
  border-top: 4px solid
    ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${rotate} 0.8s linear infinite;
`;
