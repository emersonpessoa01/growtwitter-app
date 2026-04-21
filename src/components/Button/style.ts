import styled, { keyframes } from "styled-components";

interface ButtonProps {
  $width?: string;
  $marginTop?: string;
  $active?: boolean;
  $loading?: boolean;
 
}

// Animação de rotação para o spinner
const rotate = keyframes`
  from { 
    transform: rotate(0deg); 
}
  to { 
    transform: rotate(360deg); 
    }
`;

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Necessário para o SpinnerWrapper */

  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 9999px; /* Botão arredondado estilo Twitter */

  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  /* Aplica as cores do Tema */
  background-color: ${(props) =>
    props.theme.colors.primary};
  color: ${(props) => props.theme.colors.buttonText};

  /* Aplicando largura e margem para o botão */
  width: ${(props) => props.$width || "100%"};
  margin-top: ${(props) => props.$marginTop || "1rem"};

  /* Efeito de Hover */
  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.theme.colors.primaryHover};
  }

  /* Estado Desabilitado (quando está carregando ou input vazio) */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Container para centralizar o spinner dentro do botão
export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// O Spinner específico para o botão (menor e branco)
export const ButtonSpinner = styled.div`
  width: 1.25rem; /* ~20px */
  height: 1.25rem;
  border: 3px solid rgba(255, 255, 255, 0.3); /* Fundo semi-transparente */
  border-top: 3px solid #ffffff; /* A parte que gira (branca) */
  border-radius: 50%;
  animation: ${rotate} 0.8s linear infinite; /* Rotação rápida */
`;
