import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import { Button } from "../../components/Button";
import { LoginForm as SignupForm } from "../Login/style";
import * as S from "../Login/style";
import logoGrowtweet from "../../assets/images/logo.png";

export function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    if (!name || !username || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    setIsRegistering(true);
    try {
      await api.post("/auth/register", {
        name,
        username,
        password,
      });
      alert("Conta criada com sucesso!");
      navigate("/login");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Falha ao cadastrar.",
      );
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <>
      <S.LoginContainer>
        <S.LogoArea>
          <img
            src={logoGrowtweet}
            alt="Growtweet"
            className="big-logo"
          />
        </S.LogoArea>
        <S.FormArea>
          <SignupForm onSubmit={handleSignup}>
            <h2>Criar conta</h2>
            <input
              autoFocus
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isRegistering}
            />
            <input
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isRegistering}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isRegistering}
            />

            <Button type="submit" loading={isRegistering}>
              Cadastrar
            </Button>

            <p
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                marginTop: "1rem",
              }}
            >
              Já tem uma conta?{" "}
              <Link to="/login">Faça login</Link>
            </p>
          </SignupForm>
        </S.FormArea>
      </S.LoginContainer>
    </>
  );
}
