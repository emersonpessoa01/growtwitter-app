import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../services/api";
import { Avatar, ExplorerContainer, FollowButton, PageTitle, UserDetails, UserRow } from "./style";

export const Explorer = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadExplorerData = useCallback(async () => {
    try {
      setLoading(true);
      // 1. Busca a lista de usuários que você mostrou no Postman
      const response = await api.get("/users");
      const usersList = response.data.data;

      // 2. Para cada usuário, buscamos o último tweet e seguidores
      // Fazemos em paralelo para ser mais rápido
      const enrichedUsers = await Promise.all(
        usersList.map(async (u: any) => {
          try {
            // Busca os tweets do usuário específico
            const tweetsRes = await api.get(`/users/${u.id}/tweets`);
            const tweets = tweetsRes.data.data || [];
            
            // Aqui pegamos o conteúdo do primeiro tweet da lista
            const lastTweetContent = tweets.length > 0 
              ? tweets[0].content 
              : "Este usuário ainda não tweetou.";

            return { 
              ...u, 
              lastTweet: lastTweetContent,
              followersCount: u.followers?.length || 0 // Se o back não trouxer, fica 0
            };
          } catch {
            return { ...u, lastTweet: "Informação indisponível.", followersCount: 0 };
          }
        })
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

  if (loading) return <div style={{ padding: "20px" }}>Carregando explorador...</div>;

  return (
    <ExplorerContainer>
      <PageTitle>Explorar usuários</PageTitle>

      {users.map((user) => (
        <UserRow key={user.id} onClick={() => navigate(`/profile/${user.id}`)}>
          <Avatar 
            src={user.imageUrl || `https://ui-avatars.com/api/?name=${user.name}`} 
            alt={user.name} 
          />
          
          <UserDetails>
            <div className="header">
              <div>
                <strong>{user.name}</strong>
                <span>@{user.username}</span>
              </div>
              {/* <FollowButton onClick={(e) => {
                e.stopPropagation(); // Não deixa clicar no card e ir pro perfil
                alert(`Seguindo ${user.name}`);
              }}>
                Seguir
              </FollowButton> */}
            </div>

            <div className="last-tweet-box">
              <small>Último tweet:</small>
              {user.lastTweet}
            </div>

            <div className="stats">
              <span><strong>{user.followersCount}</strong> seguidores</span>
            </div>
          </UserDetails>
        </UserRow>
      ))}
    </ExplorerContainer>
  );
};