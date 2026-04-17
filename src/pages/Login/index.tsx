import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoginForm } from "./style";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setIsLoggingIn(true);
    // Validar se os campos estão preenchidos
    if (!username || !password) {
      alert("Preencha todos os campos.");
      return;
    }
    try {
      await signIn({
        username,
        password,
      })
      navigate("/");
    } catch {
      alert("Login falhou. Verifique usuário e senha.");
    }finally{
      setIsLoggingIn(false);
    }
  }

  return (
    <LoginForm onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"
        type="text"
        disabled={isLoggingIn}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        disabled={isLoggingIn}
      />
      <button type="submit"disabled={isLoggingIn}>
        {isLoggingIn ? "Entrando..." : "Entrar"}
      </button>
    </LoginForm>
  );
}
