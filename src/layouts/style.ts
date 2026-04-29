import styled from "styled-components";

export const SideBarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

export const BoxImage = styled.div`
  width: 100%;
  height: auto;
  max-width: 300px;
  margin: 0 auto;
  cursor: pointer;
`;

export const ToggleTheme = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg.daymoon {
    color: ${(props) => props.theme.colors.daymoon};
    padding: 0 1rem;
    display: block;
    width: 100%;
    height: auto;
  }
`;
