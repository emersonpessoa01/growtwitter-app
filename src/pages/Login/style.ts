import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.textColor};

  /* Responsividade: em celulares, fica uma coluna só */
  @media (max-width: 1024px) {
    grid-template-columns: 240px minmax(0, 1fr);

    aside:last-child {
      display: none;
    }

    .logo img {
      width: 80px;
    }
  }

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

  img.big-logo {
    width: 100%; /* Deixe ocupar o espaço do container */
    max-width: 300px; /* Reduzi um pouco para não estourar */
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 991px) {
    flex: none;
    
    
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    img.big-logo {
      width: clamp(80px, 100%, 120px); /* Logo menor no mobile, acima do form */
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