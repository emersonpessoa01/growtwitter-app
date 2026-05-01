import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";
import * as S from "./login-styles"; // Importando tudo como 'S'
import { BsSun, BsMoonStars } from "react-icons/bs";

// Importando a logo do Growtwitter
import logoGrowtweet from "../../assets/images/logo.png";

interface LoginProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export function Login({
  toggleTheme,
  isDarkMode,
}: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    if (!username || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    setIsLoggingIn(true);
    try {
      await signIn({ username, password });
      navigate("/");
    } catch {
      alert("Login falhou. Verifique usuário e senha");
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <S.LoginContainer>
      {/* Área da Logo Grande (Esquerda) */}
      <S.LogoArea>
        <img
          src={logoGrowtweet}
          alt="Growtweet"
          className="big-logo"
        />
      </S.LogoArea>

      {/* Área do Formulário (Direita) */}
      <S.FormArea>
        <S.LoginForm onSubmit={handleLogin}>
          {/* Botão de Tema no topo do form */}
          <div
            className="theme-toggle"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <BsSun size={20} className="daymoon" />
            ) : (
              <BsMoonStars size={20} className="daymoon" />
            )}
          </div>

          <h2>Entrar no Growtwitter</h2>

          <input
            type="text"
            name="user"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            disabled={isLoggingIn}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            disabled={isLoggingIn}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            loading={isLoggingIn}
            $width="100%"
          >
            Entrar
          </Button>

          <p>
            Não tem uma conta?{" "}
            <Link to="/signup">Cadastre-se</Link>
          </p>
        </S.LoginForm>
      </S.FormArea>
    </S.LoginContainer>
  );
}
