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

export const ProfileHeader = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};

  .banner {
    height: 200px;
    background-color: ${(props) =>
      props.theme.colors.secondary};
    /* margin: -1rem -1rem 0 -1rem; */
  }
  .info {
    padding: 0 1rem;
    margin-top: -50px;
    display: flex;
    flex-direction: column;
    gap: 4px;
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

export const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin:12px 0;

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
    padding: 15px;
    text-align: center;
    font-weight: bold;
    color: #536471;
    cursor: pointer;
    
    &:first-child {
      color: #0f1419;
      border-bottom: 4px solid #1d9bf0;
    }
    &:hover{
        background-color: ${(props) => props.theme.colors.secondary};
        
    }
  }
`;