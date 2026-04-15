import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });

      console.log("Resposta da API:", res.data);

      // token está em res.data.data.authToken
      const token = res.data?.data?.authToken;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        alert("Token não encontrado na resposta da API");
      }
    } catch {
      alert("Login falhou. Verifique usuário e senha.");
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      style={{
        maxWidth: "300px",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
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
    </form>
  );
}
