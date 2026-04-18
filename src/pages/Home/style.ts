import styled, { keyframes } from "styled-components";

//1. Definir o que o componente pode receber
interface SpinnerProps {
  borderTopColor?: string;
  borderLeftColor?: string;
  size?: string;
}

const rotate = keyframes`
    from{
        transform: rotate(0deg);

    }to{
        transform: rotate(360deg);
    }
`;

//2. Usar a função para ler a prop ou usar um valor padrão
export const ButtonSpinner = styled.div<SpinnerProps>`
  /* Usa o valor da prop size ou o padrão de 1.25rem */
  width: ${(props) => props.size || "2.5rem"};
  height: ${(props) => props.size || "2.5rem"};

  border-radius: 50%;
  animation: ${rotate} 0.8s linear infinite;

  border: 3px solid
    ${(props) =>
      props.borderLeftColor || "rgba(255, 255, 255, 0.3)"};

  border-top: 3px solid
    ${(props) =>
      props.borderTopColor || props.theme.colors.primary};
`;
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
    display: flex;
    flex-flow: column wrap;

    li {
      flex: 1;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s;
      padding: 0.5rem;
      border-radius: 5px;

      &:hover {
        color: ${(props) => props.theme.colors.buttonText};
        background-color: ${(props) =>
          props.theme.colors.primaryHover};
      }
    }
  }
`;

export const MainContent = styled.main`
  flex: 1 1 auto;
  border-right: 1px solid
    ${(props) => props.theme.colors.border};
  padding: 1rem 0;
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
