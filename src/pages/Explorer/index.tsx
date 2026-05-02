import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../services/api";
import {
  Avatar,
  ExplorerContainer,
  PageTitle,
  UserDetails,
  UserRow,
} from "./style";
// Importando os componentes de loading que é usado no Profile
import {
  SpinnerContainer,
  StyledSpinner,
} from "../../components/Spinner/style";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Explorer = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadExplorerData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      const usersList = response.data.data;

      const enrichedUsers = await Promise.all(
        usersList.map(async (u: any) => {
          try {
            // 1. Busca o perfil completo para pegar os followers
            const userDetailRes = await api.get(
              `/users/${u.id}`,
            );
            const fullUser =
              userDetailRes.data.data || userDetailRes.data;

            // 2. Busca os tweets para o último tweet
            const tweetsRes = await api.get(
              `/users/${u.id}/tweets`,
            );
            const tweets = tweetsRes.data.data || [];

            return {
              ...u,
              lastTweet:
                tweets.length > 0
                  ? tweets[0].content
                  : "Este usuário ainda não tweetou.",
              // Usando os dados do perfil completo que contém a array followers
              followersCount:
                fullUser.followers?.length || 0,
            };
          } catch (error) {
            console.error(
              `Erro ao enriquecer usuário ${u.id}:`,
              error,
            );
            return {
              ...u,
              lastTweet: "Informação indisponível.",
              followersCount: 0,
            };
          }
        }),
      );

      setUsers(enrichedUsers);
    } catch (error) {
      console.error("Erro ao carregar explorer:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExplorerData();
  }, [loadExplorerData]);

  const formatCodeText = (text: string) => {
    // Lista de palavras reservada para destacar
    const reservedWords = [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "import",
      "export",
      "APP_PORT",
      "PORT",
      "3000",
      "/",
      "process",
      "env",
      "http",
      "app",
      "message",
      "body",
      "json",
      "status",
      "ok",
      "get",
      "post",
      "put",
      "delete",
      "patch",
      "req",
      "res",
      "Java",
      "Spring Boot",
      "React",
      "Node",
      "Express",
      "Mongo",
      "Mongoose",
      "TypeScript",
      "Styled Components",
      "GitHub",
      "Code",
      "Git",
      "Repeat",
      "Break",
      "For",
      "While",
      "Do",
      "Switch",
      "Case",
      "Default",
      "Try",
      "Catch",
      "Finally",
      "Throw",
      "Fix",
      "Dev",
      "Programação",
      "Motivação",
      "Desenvolvimento",
      "Twitter",
      "API",
      "REST",
      "Python",
      "JavaScript",
      "HTML",
      "CSS",
      "ReactJS",
      "NextJS",
      "TailwindCSS",
      "MaterialUI",
      "Redux",
      "ReduxToolkit",
      "Jest",

    ];

    // Procura por essas palavras exatas em ordem crescente
    const regex = new RegExp(
      `\\b(${reservedWords.join("|")})\\b`,
      "g",
    );

    // Divide o texto em partes e aplica a formatação
    const parts = text.split(regex);

    return parts.map((part, index) =>
      reservedWords.includes(part) ? (
        <span key={index}>{part}</span>
      ) : (
        part
      ),
    );
  };

  return (
    <ExplorerContainer>
      {/* O Título fixo no topo */}
      <PageTitle>Explorar usuários</PageTitle>

      {loading ? (
        /* Spinner centralizado logo abaixo do título */
        <SpinnerContainer
          style={{
            height: "300px",
            background: "transparent",
          }}
        >
          <StyledSpinner />
        </SpinnerContainer>
      ) : (
        /* Lista de usuários só aparece após o loading */
        users.map((user) => (
          <UserRow
            key={user.id}
            onClick={() =>
              navigate(`/profile/${user.id}`, {
                state: {
                  username: user.username,
                },
              })
            }
          >
            <Avatar
              src={
                user.imageUrl ||
                `https://ui-avatars.com/api/?name=${user.name}`
              }
              alt={user.name}
            />

            <UserDetails>
              <div className="header">
                <div>
                  <strong>{user.name}</strong>
                  <span>@{user.username}</span>
                  <span className="dot">.</span>
                  <span className="date">
                    {user.createdAt
                      ? format(
                          new Date(user.createdAt),
                          "d 'de' MMM., HH:mm",
                          {
                            locale: ptBR,
                          },
                        )
                      : ""}
                  </span>
                </div>
              </div>

              <div className="last-tweet-box">
                <small>Último tweet:</small>
                {user.lastTweet
                  ? formatCodeText(user.lastTweet)
                  : "Informação indisponível."}
              </div>

              <div className="stats">
                <span>
                  <strong>{user.followersCount}</strong>{" "}
                  {user.followersCount <= 1 ? "seguidor" : "seguidores"}
                </span>
              </div>
            </UserDetails>
          </UserRow>
        ))
      )}
    </ExplorerContainer>
  );
};
