import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme.colors.backgroundColor};
`;

export const MainContent = styled.main`
  flex: 1;
  border-left: 1px solid
    ${(props) => props.theme.colors.border};
  border-right: 1px solid
    ${(props) => props.theme.colors.border};
  max-width: 600px;
`;

export const TopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.theme.colors.backgroundColor};
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};

  .back-button {
    cursor: pointer;
    border-radius: 50%;
    padding: 0.5rem;
    display: flex;
    transition: background-color 0.2s;
    &:hover {
      background-color: #eff3f4;
      color: ${(props) => props.theme.colors.primaryHover};
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 1.2rem;
      margin: 0;
      color: ${(props) => props.theme.colors.textColor};
    }
    span {
      font-size: 0.9rem;
      color: ${(props) =>
        props.theme.colors.textColorSecondary};
    }
  }
`;

export const ProfileHeader = styled.div`
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};

  .banner {
    height: 200px;
    background-color: ${(props) =>
      props.theme.colors.primary};
    /* margin: -1rem -1rem 0 -1rem; */
  }
  .info {
    padding: 0 1rem;
    margin-top: -50px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .avatar-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: flex-end;
    /* margin-top: -50px; */
  }
  strong {
    font-size: 1.2rem;
    margin-top: 8px;
  }
  span.username {
    color: #536471;
    font-size: 0.9rem;
  }
`;

export const EditButton = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 8px 16px;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  color: ${(props) => props.theme.colors.textColor};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.secondary};
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 12px 0;

  span {
    font-size: 0.9rem;
    color: ${(props) =>
      props.theme.colors.textColorSecondary};
    strong {
      color: ${(props) => props.theme.colors.textColor};
    }
  }
`;

// Adicione as Abas (Tabs) apenas se quiser o visual da Dani
export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  /* margin-top: 8px; */

  div {
    flex: 1;
    padding: 24px;
    text-align: center;
    font-weight: bold;
    color: ${(props) =>
      props.theme.colors.textColorSecondary};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;

    &:hover {
      background-color: ${(props) =>
        props.theme.colors.secondary};
    }
    /* Agora a borda azul depende da classe 'active' */
    &.active {
      color: ${(props) => props.theme.colors.primary};
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 56px;
        height: 4px;
        background-color: #1d9bf0;
        border-radius: 9999px;
      }
    }
  }
`;
