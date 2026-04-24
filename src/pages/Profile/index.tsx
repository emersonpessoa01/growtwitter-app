import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { TweetCard } from "../../components/TweetCard";
import * as S from "./style";
import { Avatar } from "../../components/TweetCard/style";
import {
  SpinnerContainer,
  StyledSpinner,
} from "../../components/Spinner/style";
import { FiArrowLeft } from "react-icons/fi";

export const Profile = () => {
  const { user } = useAuth();
  const [myTweets, setMyTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tweets");

  useEffect(() => {
    async function loadProfileData() {
      if (!user?.id) return;
      try {
        setLoading(true);
        // Buscando apenas os tweets deste usuário específico
        const response = await api.get(
          `/users/${user.id}/tweets`,
        );
        setMyTweets(response.data.data || []);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfileData();
  }, [user?.id]);

  return (
    <S.Container>
      <S.MainContent>
        <S.TopNav>
          <div
            className="back-button"
            onClick={() => window.location.href = "/home"}
          >
            <FiArrowLeft size={20} />
          </div>
          <div className="user-info">
            <h2>{user?.name}</h2>
            <span>{myTweets.length} Tweets</span>
          </div>
        </S.TopNav>

        {/* O Spinner agora engloba todo o conteúdo abaixo do TopNav durante o loading */}
        {loading ? (
          <SpinnerContainer
            style={{
              height: "calc(100vh - 60px)", // Ocupa o restante da tela
              width: "100%",
              backgroundColor: "transparent",
            }}
          >
            <StyledSpinner />
          </SpinnerContainer>
        ) : (
          <>
            <S.ProfileHeader>
              <div className="banner" />
              <div className="info">
                <div className="avatar-row">
                  <Avatar
                    src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.name}`}
                    style={{
                      width: 133,
                      height: 133,
                      border: "4px solid white",
                    }}
                  />
                  <S.EditButton onClick={() => console.log("Abrir Modal")}>
                    Editar Perfil
                  </S.EditButton>
                </div>
                <strong>{user?.name}</strong>
                <span className="username">@{user?.username}</span>

                <S.StatsContainer>
                  <span><strong>0</strong> Seguindo</span>
                  <span><strong>0</strong> Seguidores</span>
                </S.StatsContainer>
              </div>
            </S.ProfileHeader>

            <S.TabsContainer>
              <div 
                className={activeTab === "tweets" ? "active" : ""} 
                onClick={() => setActiveTab("tweets")}
              >
                Tweets
              </div>
              <div 
                className={activeTab === "replies" ? "active" : ""} 
                onClick={() => setActiveTab("replies")}
              >
                Respostas
              </div>
              <div 
                className={activeTab === "likes" ? "active" : ""} 
                onClick={() => setActiveTab("likes")}
              >
                Curtidas
              </div>
            </S.TabsContainer>

            <div>
              {myTweets.length > 0 ? (
                myTweets.map((tweet: any) => (
                  <TweetCard
                    key={tweet.id}
                    name={user?.name || ""}
                    username={user?.username || ""}
                    content={tweet.content}
                    avatarUrl={user?.imageUrl}
                    likes={tweet.likes?.length || 0}
                    isAuthor={true}
                  />
                ))
              ) : (
                <p style={{ padding: "2rem", textAlign: "center" }}>
                  Você ainda não tweetou nada.
                </p>
              )}
            </div>
          </>
        )}
      </S.MainContent>
    </S.Container>
  );
};
