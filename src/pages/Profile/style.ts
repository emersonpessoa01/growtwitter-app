import styled from "styled-components";

const colors = {
  background: "#FFFFFF",
  overlay: "rgba(0, 0, 0, 0.4)",
  border: "rgba(0, 0, 0, 0.12)",
  textPrimary: "#0F1419",
  textSecondary: "#536471",
  accent: "#1D9BF0",
  saveBtnText: "#FFFFFF",
};

export const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme.colors.backgroundColor};
`;

export const MainContent = styled.main`
  flex: 1;
  border-left: 1px solid
    ${(props) => props.theme.colors.border};
  max-width: 600px;
`;

export const TopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
      props.theme.colors.backgroundColor}
    40%;
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;

  .back-button {
    cursor: pointer;
    border-radius: 50%;
    padding: 0.5rem;
    display: flex;
    transition: background-color 0.2s;
    &:hover {
      background-color: #eff3f4;
      color: ${(props) => props.theme.colors.primaryHover};
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 1.2rem;
      margin: 0;
      color: ${(props) => props.theme.colors.textColor};
    }
    span {
      font-size: 0.9rem;
      color: ${(props) =>
        props.theme.colors.textColorSecondary};
    }
  }
`;

export const ProfileHeader = styled.div`
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  border-bottom: 1px solid
    ${(props) => props.theme.colors.border};

  .banner {
    height: 200px;
    background-color: ${(props) => props.theme.colors.primary};
  }
  .info {
    padding: 0 1rem;
    margin-top: -70px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .avatar-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: flex-end;
  }
  strong {
    font-size: 1.2rem;
    margin-top: 8px;
  }
  span.username {
    color: ${(props) => props.theme.colors.textColorSecondary};
    font-size: 0.9rem;
  }
`;

export const EditButton = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 8px 16px;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  color: ${(props) => props.theme.colors.textColor};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.secondary};
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 12px 0;

  span {
    font-size: 0.9rem;
    color: ${(props) =>
      props.theme.colors.textColorSecondary};
    strong {
      color: ${(props) => props.theme.colors.textColor};
    }
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  div {
    flex: 1;
    padding: 18px;
    text-align: center;
    font-weight: bold;
    color: ${(props) =>
      props.theme.colors.textColorSecondary};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;

    &:hover {
      background-color: ${(props) =>
        props.theme.colors.secondary};
    }
    /* Agora a borda azul depende da classe 'active' */
    &.active {
      color: ${(props) => props.theme.colors.primary};
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 56px;
        height: 4px;
        background-color: #1d9bf0;
        border-radius: 9999px;
      }
    }
  }
`;

// Modal

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(
    2px
  ); /* Efeito opcional de desfoque sutil no fundo */
`;

export const ModalContent = styled.div`
  background-color: ${colors.background};
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15); 

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid ${colors.border};

    div.left-content {
      display: flex;
      align-items: center;
      gap: 1.5rem; /* gap reduzido para alinhar melhor */
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: ${colors.textPrimary};
      margin: 0;
    }

    button.close-button {
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      padding: 8px;
      border-radius: 50%;
      color: ${colors.textPrimary};
      transition: background-color 0.2s;
      &:hover {
        background-color: rgba(15, 20, 25, 0.1);
      }
    }

    button.save-button {
      background-color: ${colors.accent}; /* Botão Azul */
      color: ${colors.saveBtnText};
      border: none;
      padding: 8px 20px;
      border-radius: 9999px; /* Formato Pílula */
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: opacity 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      min-height: 40px;

      &:hover {
        opacity: 0.9;
      }
      &:disabled {
        cursor: not-allowed;
      }

      svg {
        font-size: 1.1rem;
      } /* Tamanho do ícone de salvar */
    }
  }

  form {
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    span {
      font-size: 0.8rem;
      color: ${(props) =>
        props.theme.colors.textColorSecondary};
    }
  }
`;

export const AvatarRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;
export const FloatingInputGroup = styled.div`
  position: relative;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  padding: 1.25rem 0.75rem 0.5rem 0.75rem; /* Espaço para o label subir */
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus-within {
    border-color: ${colors.accent};
    box-shadow: 0 0 0 1px ${colors.accent};
  }

  label {
    position: absolute;
    top: 1.25rem;
    left: 0.75rem;
    font-size: 1.1rem;
    color: ${colors.textSecondary};
    transition: all 0.2s ease-out;
    pointer-events: none; /* Garante que o clique passe para o input */
  }

  input {
    border: none;
    background: transparent;
    font-size: 1.1rem;
    width: 100%;
    outline: none;
    color: ${colors.textPrimary};
    padding: 0;

    /* Lógica para o label subir quando focado ou tiver texto */
    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 0.25rem;
      font-size: 0.8rem;
      color: ${colors.accent};
      font-weight: 600;
    }
  }
`;
