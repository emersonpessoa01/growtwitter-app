import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { Avatar } from "../TweetCard/style";
import { Button } from "../Button";
import * as S from "./style"; // Crie um style básico para ele

export const WhoToFollow = () => {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get("/users");
        if (response.data.success) {
          // Filtra você mesmo e limita a 3 pessoas
          const filtered = response.data.data.filter(
            (u: any) => u.id !== user?.id
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
      // Conforme seu backend: POST /followers enviando { userId }
      await api.post("/followers", { userId });
      setSuggestions((prev) => prev.filter((u) => u.id !== userId));
    } catch (error) {
      alert("Erro ao seguir usuário.");
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
            src={s.imageUrl || `https://ui-avatars.com/api/?name=${s.name}`} 
            style={{ width: '40px', height: '40px' }}
          />
          <div>
            <strong>{s.name}</strong>
            <span>@{s.username}</span>
          </div>
        </S.UserInfo>
        <Button 
          onClick={() => handleFollow(s.id)} 
          $width="auto" 
          style={{ padding: '4px 12px', fontSize: '12px' }}
        >
          Seguir
        </Button>
      </S.UserItem>
    ))}
  </S.Container>
);
};