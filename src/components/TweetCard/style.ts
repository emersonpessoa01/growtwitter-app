import styled from "styled-components";
interface CardContainerProps {
  $isReply?: boolean;
}

export const CardContainer = styled.div<CardContainerProps>`
  display: flex;
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

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.primary};
  background-color: #333;
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
  gap: 0.5rem;
  align-items: center;

  strong {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.textColor};
  }

  span {
    font-size: 0.9rem;
    color: ${(props) =>
      props.theme.colors.textColorSecondary};
  }
`;

export const TweetText = styled.p<{ $isReply?: boolean }>`
  font-size: 0.95rem;
  line-height: 1.3;
  color: ${(props) => props.theme.colors.title};
  word-break: break-word;

  /* Lógica condicional: Estiliza apenas se for um comentário */
  ${(props) => props.$isReply &&`
    background: #4f4f4f0a;
    padding: 10px;
    border-radius: 8px;
    font-size: 0.9rem;
  `}
`;

export const Actions = styled.div`
  display: flex;
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
