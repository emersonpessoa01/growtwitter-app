import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 275px minmax(0, 600px) 350px;
  justify-content: center;

  width: 100%;
  margin: 0 auto;
  max-width: 1280px;
  min-height: 100vh;

  background-color: ${(props) =>
    props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.textColor};

  @media (max-width: 1280px) {
    grid-template-columns: 240px minmax(0, 600px) 300px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 240px minmax(0, 1fr);

    aside:last-child {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 88px minmax(0, 1fr);

    aside:first-child {
      width: 80px;
      padding: 10px;

      span {
        display: none;
      }

      nav a {
        justify-content: center;
        padding: 12px;
      }
    }
  }
`;

export const SideBar = styled.aside`
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .logo {
    padding: 1rem;
  }

  .logo img {
    width: clamp(3rem, 100%, 8rem);
  }
`;
export const NavMenu = styled.nav`
  margin-top: 1rem;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MenuItem = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;

  color: ${(props) => props.theme.colors.textColor};

  font-weight: ${(props) =>
    props.$active ? "bold" : "normal"};

  svg {
    stroke: currentColor;
    stroke-width: ${(props) =>
      props.$active ? "0.6px" : "0.2px"};
    transition: all 0.2s;
  }

  &:hover {
    color: ${(props) => props.theme.colors.buttonText};
    font-weight: bold;
    background-color: ${(props) =>
      props.theme.colors.primaryHover};
    border-radius: 9999px;

    svg {
      stroke-width: 0.8px;
    }
  }
  span{
   @media (max-width: 768px) {
      display: none;
    } 
  }
  @media (max-width: 768px) {
    justify-content: center;
    width: fit-content;
    margin: 0 auto;
  }
`;
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  border-radius: 396px;
  transition: background 0.4s;

  @media (max-width: 768px) {
    border-radius: 0;
    justify-content: center;
  }
  div:last-child{
    @media (max-width: 768px) {
      display: none;
    }
  }

  &:hover {
    background: ${(props) => props.theme.colors.border};
  }
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  strong {
    display: block;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.9rem;
  }

  span {
    color: ${(props) => props.theme.colors.textColor};
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  max-width: 600px;
  border-inline: 1px solid
    ${(props) => props.theme.colors.border};
`;

export const PageHeader = styled.header`
  padding: 1rem;
  background-color: ${(props) =>
    props.theme.colors
      .backgroundColor}40; /* 40 = 25% opacidade em hex */
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border}60;
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 20;

  h3 {
    font-size: 1.25rem;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
  position: sticky;
  top: 0;
  background: linear-gradient(
    to bottom,
    ${(props) => props.theme.colors.secondary} 0%,
    ${(props) => props.theme.colors.secondary} 70%,
    ${(props) => props.theme.colors.secondary} 100%
  );
  backdrop-filter: blur(5px);
  z-index: 10;
`;

export const Tab = styled.div<{ $active: boolean }>`
  // Removido o '?' para evitar undefined
  flex: 1;
  text-align: center;
  padding: 1rem 0;
  cursor: pointer;
  font-weight: ${(props) =>
    props.$active ? "bold" : "500"};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary
      : props.theme.colors.textColorSecondary};
  position: relative;
  transition: background-color 0.2s;

  &::after {
    content: "";
    display: ${(props) =>
      props.$active ? "block" : "none"};
    position: absolute;
    bottom: 0;
    left: 25%; // Centraliza a linha azul
    width: 50%;
    height: 3px;
    background-color: ${(props) =>
      props.theme.colors.primary};
    border-radius: 2px;
  }

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.border};
  }
`;

// Novo: Seção de conteúdo do feed
export const FeedSection = styled.section`
  padding: 0 0 1rem 0;

  p {
    padding: 10px;
  }
`;

export const TweetWrapper = styled.div`
  border-bottom: 1px solid
    ${(props) => props.theme.colors.buttonText};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.secondary};
  }
`;

export const TweetContainer = styled.div`
  margin-left: 50px;
  /* border-left: 2px solid ${(props) =>
    props.theme.colors.border}; */
`;
// Novo: Coluna de Widgets (Terceira Coluna)
export const WidgetsAside = styled.aside`
  width: 300px;
  padding: 1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
`;

export const AvatarImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 100;
`;
export const FormContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  textarea {
    width: 100%;
    border: none;
    background: transparent;
    color: ${(props) => props.theme.colors.textColor};
    font-size: 1rem;
    resize: none;
    outline: none;
    font-family: inherit;

    &::placeholder {
      color: ${(props) => props.theme.colors.textColor};
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    padding-top: 0.5rem;
    border-top: 1px solid
      ${(props) => props.theme.colors.border};
  }
`;
