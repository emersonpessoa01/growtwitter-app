import styled from "styled-components";
import { CardContainer } from "../../components/TweetCard/style";

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

  @media (max-width: 1024px) {
    grid-template-columns: 88px minmax(0, 1fr);
    aside:last-child {
      display: none;
    }
  }

  @media (max-width: 500px) {
    display: block;
    width: 100%;
  }
`;

export const SideBar = styled.aside`
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  /* padding: 1rem 2rem; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  
  @media (max-width: 1024px) {
    padding: 1rem;
  }

  @media (max-width: 500px) {
    position: fixed !important;
    bottom: 0 !important;
    top: auto !important;
    left: 0;
    width: 100% !important;
    height: 73px !important;
    background-color: ${(props) =>
      props.theme.colors.backgroundColor};
    border-top: 1px solid
      ${(props) => props.theme.colors.border};
    z-index: 9999;
    display: block;

    .logo,
    .UserInfo,
    .theme-toggle {
      display: none !important;

      
    }

    .tweet-button {
      position: fixed !important;
      bottom: 80px !important;
      right: 20px !important;
      width: 56px !important;
      height: 56px !important;
      border-radius: 50% !important;
      z-index: 10000 !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      padding: 0 !important;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      pointer-events: auto !important;

      .button-text {
        display: none !important;
      }
      .button-icon {
        display: block !important;
        font-size: 28px !important;
      }
    }
  }
`;

export const MainContent = styled.main`
  flex: 1;
  max-width: 600px;
  border-inline: 1px solid
    ${(props) => props.theme.colors.border};
  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 500px) {
    max-width: 100%;
    border: none;
    padding-bottom: 80px;
  }
`;

export const PageHeader = styled.header`
  padding: 1rem;
  background-color: ${(props) =>
    props.theme.colors.backgroundColor}E6;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
  position: fixed;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
  width: 100%;

  @media (min-width: 501px) {
    position: sticky;
  }
`;

// OS COMPONENTES QUE ESTAVAM FALTANDO E CAUSANDO A TELA BRANCA:
export const FeedSection = styled.section`
  width: 100%;

  @media (max-width: 500px) {
    padding-top: 60px;
  }
`;

export const TweetContainer = styled.div`
  width: 100%;
  margin-left: 48px;
  /* padding-bottom: 8px; */
`;

export const FormContainer = styled.form`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
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
    font-size: 1.2rem;
    resize: none;
    outline: none;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid
      ${(props) => props.theme.colors.border};
    padding-top: 0.5rem;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%; // Importante para o logout ir para o fim

  @media (max-width: 500px) {
    flex-direction: row !important;
    justify-content: space-around !important; // Distribui os ícones com distâncias iguais
    align-items: center;
    width: 100%;
    padding: 0;
    gap: 0; // Remove o gap para o space-around trabalhar
  }

  /* No desktop, empurra o último item (logout) para o final da sidebar */
  .logout-item {
    margin-top: auto; 
    color: #f91880; // Cor diferenciada opcional para o "Sair"

    @media (max-width: 500px) {
      margin-top: 0; // Remove o empurrão no mobile
    }
  }
`;
export const MenuItem = styled.li<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 9999px;
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary
      : props.theme.colors.textColor};
  background-color: ${(props) =>
    props.$active
      ? props.theme.colors.secondary
      : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.secondary};
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    border-radius: 8px;
  }

  span {
    @media (max-width: 1024px) {
      display: none;
    }
  }
  @media (max-width: 500px) {

    /* Quando o botão de logout tem uma classe específica, pode-se dar um margin-left auto */
    &.logout-button {
      margin-left: auto;
    }
  }

  @media (max-width: 500px) {
    padding: 0.5rem;

    &.logout-button{
      color: #f91880;
    }
  }
`;

export const NavMenu = styled.nav`
  width: 100%;
`;

export const TweetWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
  word-break: break-word;

  ${CardContainer} {
    border-bottom: none;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
  background-color: ${(props) =>
    props.theme.colors.backgroundColor}F2;
  position: sticky;
  top: 53px;
  z-index: 10;
  backdrop-filter: blur(12px);

  @media (max-width: 500px) {
    top: 53px;
  }
`;

export const Tab = styled.div<{ $active: boolean }>`
  flex: 1;
  text-align: center;
  padding: 1rem;
  cursor: pointer;
  font-weight: ${(props) =>
    props.$active ? "bold" : "500"};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary
      : props.theme.colors.textColorSecondary};
  position: relative;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.border}40;
  }

  /* A barrinha azul da aba ativa */
  &::after {
    content: "";
    display: ${(props) =>
      props.$active ? "block" : "none"};
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 56px; /* Largura da barrinha */
    height: 4px;
    background-color: ${(props) =>
      props.theme.colors.primary};
    border-radius: 9999px;
  }
`;
export const WidgetsAside = styled.aside`
  width: 300px;
  padding: 1rem;
`;
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  @media (max-width: 1024px) {
    flex-direction: column;
    .button-logout {
      display: block;
      color: ${(props) => props.theme.colors.textColor};
    }
  }
  @media (max-width: 500px) {
    justify-content: center;
    img {
      display: none;
    }
    .button-logout {
      color: #f91880;
    }
  }
`;
export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    display: none;
  }
`;
