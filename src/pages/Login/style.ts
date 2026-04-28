import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.textColor};

  /* Responsividade: em celulares, fica uma coluna só */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const LogoArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  /* Estilo para a logo grande da esquerda */
  img.big-logo {
    width: 80%;
    max-width: 400px;
    height: auto;
  }

  @media (max-width: 768px) {
    flex: none;
    padding: 1rem;
    margin-bottom: 2rem;
    
    img.big-logo {
      width: 100px; /* Logo menor no mobile, acima do form */
    }
  }
`;

export const FormArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    flex: none;
    padding: 1rem;
  }
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 400px; /* Largura igual à do Figma*/
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Espaçamento maior entre campos */
  padding: 2rem;
  
  /* Efeito de "card" no form */
  background: ${(props) => props.theme.colors.secondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.title};
    margin-bottom: 1rem;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.colors.border};
    background: transparent;
    color: ${(props) => props.theme.colors.textColor};
    font-size: 1rem;
    
    &::placeholder {
      color: ${(props) => props.theme.colors.textColorSecondary};
    }

    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
      outline: none;
    }
  }

  p {
    text-align: center;
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.textColorSecondary};
    margin-top: 1rem;

    a {
      color: ${(props) => props.theme.colors.primary};
      font-weight: bold;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 1.5rem;
  }
`;