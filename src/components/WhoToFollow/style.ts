import styled from "styled-components";

export const Container = styled.aside`
  background-color: #F2F5F7;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    margin-bottom: 8px;
    // Se o Figma usa uma linha separadora:
    border-bottom: 1px solid #E6E9EC;
    padding-bottom: 8px;
  }
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 0;
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
      font-size: 15px;
      color: #0F1419;
      
      // REGRAS PARA AS RETICÊNCIAS:
      white-space: nowrap;      // Impede que o nome quebre em duas linhas
      overflow: hidden;         // Esconde o que passar do limite
      text-overflow: ellipsis;  // Adiciona os "..." automaticamente
    }

    span {
      font-size: 14px;
      color: ${(props) => props.theme.colors.textColorSecondary};
      // REGRAS PARA AS RETICÊNCIAS:
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;