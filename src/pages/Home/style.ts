import styled from "styled-components";



export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
`;
export const Sidebar = styled.aside`
  width: 250px;
  border-right: 1px solid
    ${(props) => props.theme.colors.border};
  padding: 1rem;

  h2 {
    margin-bottom: 2rem;
    color: ${(props) => props.theme.colors.primary};
  }
  nav ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s;

      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }
`;

export const MainContent = styled.main`
  flex: 1;
  border-right: 1px solid
    ${(props) => props.theme.colors.border};
  padding: 1rem;
`;

export const Header = styled.header`
  padding: 1rem;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
  position: sticky;
  top: 0;
  background-color: ${(props) =>
    props.theme.colors.backgroundColor};
  z-index: 10;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
  }
`;

export const FeedSection = styled.section`
  padding: 1rem;
`;

export const LoadingContainer = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  p {
    color: ${(props) => props.theme.colors.textColor};
    font-weight: 500;
  }
`;

// Coluna da direita (Widgets/Trends)
export const RightSide = styled.aside`
  width: 300px;
  padding: 1rem;
  @media (max-width: 1000px) {
    display: none;
  }
`;
