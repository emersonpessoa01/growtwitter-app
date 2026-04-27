import styled from "styled-components";

export const EditButton = styled.button`
  /* seus estilos atuais... */
  transition: all 0.2s;

  &:disabled {
    cursor: not-allowed;
    /* Isso impede que o navegador force a cor cinza */
    filter: brightness(0.9);
  }

  &.following {
    border: 1px solid #cfd9de;
    &:hover {
      background-color: #ffe9e9 !important;
      color: #f4212e !important;
      border-color: #f4212e;
    }
  }
`;
