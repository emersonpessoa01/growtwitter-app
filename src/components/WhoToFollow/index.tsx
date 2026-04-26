import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { Avatar } from "../TweetCard/style";
import { Button } from "../Button";
import { StyledSpinner } from "../Spinner/style"; // Importe seu spinner existente
import * as S from "./style.ts";

interface WhoToFollowProps {
  onFollowSuccess?: () => void;
}

export const WhoToFollow = ({
  onFollowSuccess,
}: WhoToFollowProps) => {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  // Novo estado para controlar o loading por botão
  const [loadingId, setLoadingId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get("/users");

        if (response.data.success) {
          // Filtra para NÃO mostrar você mesmo E NÃO mostrar quem você já segue
          const filtered = response.data.data.filter(
            (u: any) => u.id !== user?.id && !u.isFollowing,
          );

          // Pega apenas os 3 primeiros da lista filtrada
          setSuggestions(filtered.slice(0, 3));
        }
      } catch (error) {
        console.error("Erro ao carregar sugestões:", error);
      }
    }

    if (user?.id) loadUsers();
  }, [user?.id]);

  const handleFollow = async (userId: string) => {
    try {
      setLoadingId(userId);
      await api.post("/followers", { userId });

      // Em vez de apenas mudar o texto para "Seguindo",
      // removemos ele da lista de sugestões:
      setSuggestions((prev) =>
        prev.filter((u) => u.id !== userId),
      );

      if (onFollowSuccess) await onFollowSuccess();
    } catch (error: any) {
      // Se já segue (409), também removemos da lista de sugestões
      if (error.response?.status === 409) {
        setSuggestions((prev) =>
          prev.filter((u) => u.id !== userId),
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <S.Container>
      <h3>Quem seguir</h3>
      {suggestions.map((s) => (
        <S.UserItem key={s.id}>
          <S.UserInfo>
            <Avatar
              src={
                s.imageUrl ||
                `https://ui-avatars.com/api/?name=${s.name}`
              }
              style={{ width: "40px", height: "40px" }}
            />
            <div>
              <strong>{s.name}</strong>
              <span>@{s.username}</span>
            </div>
          </S.UserInfo>

          <Button
            onClick={() => handleFollow(s.id)}
            $width="75px" // Largura fixa para o botão não mudar de tamanho com o spinner
            disabled={loadingId === s.id} // Desabilita enquanto carrega
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "30px",
              borderRadius: "20px",
            }}
          >
            {loadingId === s.id ? (
              <StyledSpinner
                style={{
                  width: "15px",
                  height: "15px",
                  border: "2px solid #fff",
                  borderTop: "2px solid transparent",
                }}
              />
            ) : s.isFollowing ? (
              "Seguindo"
            ) : (
              "Seguir"
            )}
          </Button>
        </S.UserItem>
      ))}
    </S.Container>
  );
};
