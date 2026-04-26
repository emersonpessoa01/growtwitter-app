import styled from "styled-components";

export const Container = styled.aside`
  background-color: ${(props) => props.theme.colors.secondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0; // CRÍTICO: permite que o flex-item diminua além do conteúdo

  div {
    display: flex;
    flex-direction: column;
    min-width: 0; // Garante que a div interna também respeite o limite

    strong {
      font-size: 0.9rem;
      color: ${(props) => props.theme.colors.textColor};
      
      // REGRAS PARA AS RETICÊNCIAS:
      white-space: nowrap;      // Impede que o nome quebre em duas linhas
      overflow: hidden;         // Esconde o que passar do limite
      text-overflow: ellipsis;  // Adiciona os "..." automaticamente
    }

    span {
      font-size: 0.85rem;
      color: ${(props) => props.theme.colors.textColorSecondary};
      // REGRAS PARA AS RETICÊNCIAS:
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;