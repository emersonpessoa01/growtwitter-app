import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.backgroundColor};
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
  border-right: 1px solid ${(props) => props.theme.colors.border};

  .logo img{
    width:6rem
  }
`;

export const NavMenu = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.1rem;
      padding: 0.8rem 0;
      cursor: pointer;
      color: ${(props) => props.theme.colors.textColor};
      
      &.active {
        font-weight: bold;
      }
      
      &:hover {
        opacity: 0.7;
      }
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
  border-right: 1px solid ${(props) => props.theme.colors.border};
`;

export const PageHeader = styled.header`
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  h3 {
    font-size: 1.25rem;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  position: sticky;
  top: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(5px);
  z-index: 10;
`;

export const Tab = styled.div<{ active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 1rem 0;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? props.theme.colors.primary : "#71767b")};
  position: relative;

  /* A linha azul embaixo da aba ativa */
  &::after {
    content: "";
    display: ${(props) => (props.active ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 4px;
    background-color: ${(props) => props.theme.colors.primary};
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