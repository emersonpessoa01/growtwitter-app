import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.textColor};
  justify-content: center;
`;

export const SideBar = styled.aside`
  width: 280px;
  height: 100vh;
  position: sticky;
  top: 0;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid
    ${(props) => props.theme.colors.border};

  .logo {
    padding: 1rem;
  }

  .logo img {
    width: 8rem;
  }
`;
export const NavMenu = styled.nav`
  margin-top: 1rem;
`;

export const NavList = styled.ul`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const MenuItem = styled.li<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;

  color: ${(props) => props.theme.colors.textColor};

  font-weight: ${(props) =>
    props.active ? "bold" : "normal"};

  svg {
    stroke: currentColor;
    stroke-width: ${(props) =>
      props.active ? "0.6px" : "0.2px"};
    transition: all 0.2s;
  }

  &:hover {
    color: ${(props) => props.theme.colors.buttonText};
    font-weight: bold;
    background-color: ${(props) =>
      props.theme.colors.primaryHover};
    border-radius: 9999px;

    svg {
      stroke-width: 0.8px;
    }
  }
`;
export const UserInfo = styled.div`
  padding-bottom: 1rem;
  cursor: pointer;

  strong {
    display: block;
    margin-bottom: 2px;
  }

  span {
    color: ${(props) => props.theme.colors.textColor};
    font-size: 0.9rem;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  max-width: 600px;
  border-right: 1px solid
    ${(props) => props.theme.colors.border};
`;

export const PageHeader = styled.header`
  padding: 1rem;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};

  h3 {
    font-size: 1.25rem;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
  position: sticky;
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.2)
  );
  backdrop-filter: blur(5px);
  z-index: 10;
`;

export const Tab = styled.div<{ active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 1rem 0;
  cursor: pointer;
  font-weight: ${(props) =>
    props.active ? "bold" : "normal"};
  color: ${(props) =>
    props.active ? props.theme.colors.primary : "#71767b"};
  position: relative;

  /* A linha azul embaixo da aba ativa */
  &::after {
    content: "";
    display: ${(props) =>
      props.active ? "block" : "none"};
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 3px;
    background-color: ${(props) =>
      props.theme.colors.primary};
    border-radius: 2px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// Novo: Seção de conteúdo do feed
export const FeedSection = styled.section`
  padding: 1rem;
`;
// Novo: Coluna de Widgets (Terceira Coluna)
export const WidgetsAside = styled.aside`
  width: 350px;
  padding: 1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;
