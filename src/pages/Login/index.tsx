import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/Button"; // Importe o novo componente
import { LoginForm } from "./style";

export function Login() {
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
    } catch (err) {
      alert("Login falhou. Verifique usuário e senha.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <LoginForm onSubmit={handleLogin}>
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
      />
      
      {/* Usamos o novo componente Button com a prop loading */}
      <Button type="submit" loading={isLoggingIn}>
        Entrar
      </Button>
    </LoginForm>
  );
}