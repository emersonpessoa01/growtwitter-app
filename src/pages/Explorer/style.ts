import styled from "styled-components";

export const ExplorerContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  min-height: 100vh;
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

export const PageTitle = styled.h2`
  padding: 15px;
  font-size: 20px;
  font-weight: 700;

  padding: 1rem;
  background-color: ${(props) =>
    props.theme.colors
      .backgroundColor}40; /* 40 = 25% opacidade em hex */
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border}60; /* 60 = 30% opacidade em hex */
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 20;
`;

export const UserRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px 16px;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
  gap: 12px;
  transition: background 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.secondary};
  }
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${(props) =>
    props.theme.colors.backgroundColor};
  border: 3px solid ${(props) => props.theme.colors.primary};
  padding: 1px;
`;

export const UserDetails = styled.div`
  flex: 1;

  .header div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;

    strong {
      font-size: 15px;
      color: ${(props) => props.theme.colors.textColor};
    }

    span {
      color: ${(props) => props.theme.colors.textColor};
      font-size: 15px;
      /* margin-left: 4px; */
    }
    .dot {
      color: ${(props) => props.theme.colors.primary};
      font-size: 30px;
      margin-top: -20px;
    }
  }

  .last-tweet-box {
    background-color: ${(props) =>
      props.theme.colors.backgroundColor};
    border-radius: 12px;
    padding: 10px;
    margin: 8px 0;
    font-size: 14px;
    color: ${(props) => props.theme.colors.textColor};
    line-height: 1.4;

    white-space: pre-wrap;
    word-break: break-word;
    overflow-wrap: break-word;

    small {
      display: block;
      color: ${(props) => props.theme.colors.textColor};
      margin-bottom: 4px;
      font-weight: bold;
    }
    
  }

  .stats {
    font-size: 13px;
    color: ${(props) => props.theme.colors.textColor};
    display: flex;
    gap: 12px;
  }
`;

export const FollowButton = styled.button`
  background-color: ${(props) =>
    props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 6px 16px;
  font-weight: 700;
  font-size: 14px;
  height: fit-content;
  cursor: pointer;

  &:hover {
    background-color: #272c30;
  }
`;
