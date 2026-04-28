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
  /* padding-right: 10px; */
  gap: 1rem;


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
