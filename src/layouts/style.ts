import styled from "styled-components";

import {
  Container as HomeContainer,
  SideBar as HomeSideBar,
} from "../pages/Home/style";

export const Container = styled(HomeContainer)``;
export const SideBar = styled(HomeSideBar)``;

export const SideBarHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-right: 10px;
  gap: 1rem;

  @media (max-width: 800px) {
    justify-content: center;
    padding-right: 0;
  }
`;

export const BoxImage = styled.div`
  .logo-img {
    width: 3rem !important;
  }
`;

export const ToggleTheme = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg.daymoon {
    color: ${(props) => props.theme.colors.daymoon};
    margin-right: 0.5rem;
  }
`;
