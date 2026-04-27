import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importante para pegar o ID
import { api } from "../../services/api";
import { TweetCard } from "../../components/TweetCard";
import * as S from "../Profile/style"; // Reaproveita os estilos do seu Profile original
import { Avatar } from "../../components/TweetCard/style";
import { FiArrowLeft } from "react-icons/fi";
import {
  SpinnerContainer,
  StyledSpinner,
} from "../../components/Spinner/style";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

export const UserProfile = () => {
  const { id } = useParams(); // Pega o ID do usuário da URL
  const { user: me } = useAuth(); // Seu usuário logado (para saber se você curtiu os tweets dele)
  const navigate = useNavigate();
  const location = useLocation();
  const initialUsername = location.state?.username; // Pega o username passado pelo clique

  const [userData, setUserData] = useState<any>(null);
  const [userTweets, setUserTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tweets");

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      // 1. Busca os dados do dono do perfil
      const userResponse = await api.get(`/users/${id}`);
      setUserData(
        userResponse.data.data || userResponse.data,
      );

      // 2. Busca os tweets conforme a aba
      let tweetsRes;
      if (activeTab === "tweets") {
        tweetsRes = await api.get(`/users/${id}/tweets`);
        setUserTweets(tweetsRes.data.data || []);
      } else if (activeTab === "likes") {
        // Lógica de curtidas: busca todos e filtra os que esse usuário curtiu
        const allRes = await api.get("/tweets");
        const liked = (allRes.data.data || []).filter(
          (t: any) =>
            t.likes?.some((l: any) => l.userId === id),
        );
        setUserTweets(liked);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, activeTab]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <S.Container>
      <S.MainContent>
        {/* O HEADER APARECE SEMPRE, INDEPENDENTE DO LOADING */}
        <S.TopNav>
          <div
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft size={20} />
          </div>
          <div className="user-info">
            <h2>
              {userData?.name ||
                initialUsername ||
                "Perfil"}
            </h2>
            <span>{userTweets.length} Tweets</span>
          </div>
        </S.TopNav>

        {loading ? (
          /* O SPINNER APARECE SOMENTE NO LUGAR DO CONTEÚDO */
          <SpinnerContainer
            style={{
              height: "calc(100vh - 60px)",
              background: "transparent",
            }}
          >
            <StyledSpinner />
          </SpinnerContainer>
        ) : (
          /* TODO O RESTO SÓ ENTRA QUANDO CARREGAR */
          <>
            <S.ProfileHeader>
              <div className="banner" />
              <div className="info">
                <div className="avatar-row">
                  <Avatar
                    src={
                      userData?.imageUrl ||
                      `https://ui-avatars.com/api/?name=${userData?.name}`
                    }
                    style={{
                      width: 133,
                      height: 133,
                      border: "4px solid white",
                    }}
                  />
                  {id === me?.id ? (
                    <S.EditButton
                      onClick={() => navigate("/profile")}
                    >
                      Editar Perfil
                    </S.EditButton>
                  ) : (
                    <S.EditButton
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                      }}
                    >
                      Seguir
                    </S.EditButton>
                  )}
                </div>
                <strong>{userData?.name}</strong>
                <span className="username">
                  @{userData?.username}
                </span>
              </div>
            </S.ProfileHeader>

            <S.TabsContainer>
              <div
                className={
                  activeTab === "tweets" ? "active" : ""
                }
                onClick={() => setActiveTab("tweets")}
              >
                Tweets
              </div>
              <div
                className={
                  activeTab === "replies" ? "active" : ""
                }
                onClick={() => setActiveTab("replies")}
              >
                Respostas
              </div>
              <div
                className={
                  activeTab === "likes" ? "active" : ""
                }
                onClick={() => setActiveTab("likes")}
              >
                Curtidas
              </div>
            </S.TabsContainer>

            <div>
              {userTweets.length > 0 ? (
                userTweets.map((tweet: any) => (
                  <TweetCard
                    key={tweet.id}
                    name={userData?.name}
                    username={userData?.username}
                    content={tweet.content}
                    avatarUrl={userData?.imageUrl}
                    likes={tweet.likes?.length || 0}
                    isLiked={tweet.likes?.some(
                      (l: any) => l.userId === me?.id,
                    )}
                    isAuthor={tweet.authorId === me?.id}
                  />
                ))
              ) : (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#536471",
                  }}
                >
                  Nenhum conteúdo por aqui ainda.
                </div>
              )}
            </div>
          </>
        )}
      </S.MainContent>
    </S.Container>
  );
};
