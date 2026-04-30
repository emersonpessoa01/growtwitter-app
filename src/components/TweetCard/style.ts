import styled from "styled-components";
interface CardContainerProps {
  $isReply?: boolean;
}

export const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  /* flex-direction: column; */
  padding: 1rem;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
  gap: ${(props) => (props.$isReply ? "16px" : "1.5rem")};
  transition: background 0.2s;
  cursor: pointer;
  

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

export const Avatar = styled.img<CardContainerProps>`
  width: ${(props) => (props.$isReply ? "36px" : "48px")};
  height: ${(props) => (props.$isReply ? "36px" : "48px")};
  border-radius: 50%;
  border: 3px solid ${(props) => props.theme.colors.primary};
  background-color: transparent;
  object-fit: cover;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  
`;

export const TweetHeader = styled.div`
  display: flex;
  align-items: flex-start; /* Alinha os itens pelo topo */
  gap: 0.5rem;
  width: 100%;
  

  strong {
    white-space: nowrap; /* Impede o nome de quebrar e empurrar tudo */
  }

  span {
    font-size:14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px; /* Ajuste conforme necessário para não cobrir a lixeira */
  }
`;
export const NameContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  
`;

export const DeleteIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: ${(props) =>
    props.theme.colors.textColorSecondary};
  cursor: pointer;
  flex-shrink: 0; /* Impede o ícone de ser esmagado */

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    color: #f4212e;
  }
`;

export const TweetText = styled.p<{ $isReply?: boolean }>`
  font-size: 0.95rem;
  line-height: 1.3;
  color: ${(props) => props.theme.colors.title};
  word-break: break-word;
  

  /* Lógica condicional: Estiliza apenas se for um comentário */
  ${(props) =>
    props.$isReply &&
    `
    background: ${props.theme.colors.border};
    padding: 10px;
    border-radius: 8px;
    font-size: 0.9rem;
  `}
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  gap: 4rem; /* Espaçamento entre comentário e curtida */
  
`;

export const ActionItem = styled.div<{
  $active?: boolean;
  $variant?: "like" | "comment";
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: ${(props) =>
    props.$active && props.$variant === "like"
      ? "#f91880"
      : "#71767b"};
  cursor: pointer;
  transition: color 0.2s;
  

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    color: ${(props) =>
      props.$variant === "like" ? "#f91880" : "#1d9bf0"};
  }
`;
