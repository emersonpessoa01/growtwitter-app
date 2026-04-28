import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";
import { LoginForm } from "./style";
import { BsSun, BsMoonStars } from "react-icons/bs";

interface LoginProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export function Login({ toggleTheme, isDarkMode }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
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
    <LoginForm onSubmit={handleLogin}>
      <div style={{ alignSelf: 'flex-end', cursor: 'pointer' }} onClick={toggleTheme}>
        {isDarkMode ? <BsSun size={20} color="#f2f2f2" /> : <BsMoonStars size={20} color="#4f4f4f" />}
      </div>
      
      <h2>Login</h2>
      <input
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"
        disabled={isLoggingIn}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        disabled={isLoggingIn}
        autoComplete="current-password"
      />

      <Button type="submit" loading={isLoggingIn}>
        Entrar
      </Button>

      <p style={{ textAlign: 'center', fontSize: '0.85rem', marginTop: '1rem', color: '#71767b' }}>
        Não tem uma conta? <Link to="/signup" style={{ color: '#1DA1F2', fontWeight: 'bold' }}>Cadastre-se</Link>
      </p>
    </LoginForm>
  );
}