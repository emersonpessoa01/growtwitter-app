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
          const filtered = response.data.data.filter(
            (u: any) => u.id !== user?.id,
          );
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
    
    // Se chegou aqui, deu 201 Created (Postman confirmou que funciona)
    setSuggestions(prev => 
      prev.map(u => u.id === userId ? { ...u, isFollowing: true } : u)
    );
    if (onFollowSuccess) await onFollowSuccess();

  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      // Se deu 409, você JÁ segue. Então atualizamos o visual do mesmo jeito!
      setSuggestions(prev => 
        prev.map(u => u.id === userId ? { ...u, isFollowing: true } : u)
      );
      if (onFollowSuccess) await onFollowSuccess();
    } else {
      console.error("Erro real na API:", error);
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
            $width="80px" // Largura fixa para o botão não mudar de tamanho com o spinner
            disabled={loadingId === s.id} // Desabilita enquanto carrega
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "30px",
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
