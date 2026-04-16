import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoginForm } from "./style";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(
    e: React.SubmitEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    try {
      await signIn({
        username,
        password,
      })
      navigate("/");
    } catch {
      alert("Login falhou. Verifique usuário e senha.");
    }
  }

  return (
    <LoginForm onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuário"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      <button type="submit">Entrar</button>
    </LoginForm>
  );
}
