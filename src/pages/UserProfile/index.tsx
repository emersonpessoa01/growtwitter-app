import { useEffect, useState, useCallback } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { api } from "../../services/api";
import { TweetCard } from "../../components/TweetCard";
import * as S from "../Profile/style";
import {
  ButtonSpinner,
  EmptyMessage,
  ProfileAvatar,
} from "./style"; // Import direto conforme seu ajuste
import { FiArrowLeft } from "react-icons/fi";
import {
  SpinnerContainer,
  StyledSpinner,
} from "../../components/Spinner/style";
import { useAuth } from "../../contexts/AuthContext";

export const UserProfile = () => {
  const { id } = useParams();
  const { user: me } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const initialUsername = location.state?.username;

  const [userData, setUserData] = useState<any>(null);
  const [userTweets, setUserTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tweets");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [followingCount, setFollowingCount] = useState(0);

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const userResponse = await api.get(`/users/${id}`);
      const data =
        userResponse.data.data || userResponse.data;
      setUserData(data);

      const following = data.followers?.some(
        (f: any) =>
          f.followerId === me?.id || f.id === me?.id,
      );
      setIsFollowing(!!following);
      setFollowingCount(data.following?.length || 0);

      const tweetsRes = await api.get(
        `/users/${id}/tweets`,
      );
      const tweetsData = tweetsRes.data.data || [];

      if (activeTab === "tweets") {
        setUserTweets(tweetsData);
      } else if (activeTab === "likes") {
        // Para a aba de curtidas, filtramos todos os tweets que esse usuário curtiu
        const allRes = await api.get("/tweets");
        const liked = (allRes.data.data || []).filter(
          (t: any) =>
            t.likes?.some((l: any) => l.userId === id),
        );
        setUserTweets(liked);
      } else {
        const response = await api.get(
          `/users/${id}/tweets`,
        );
        const replies = response.data.data?.filter(
          (t: any) => t.type === "REPLY",
        );
        setUserTweets(replies || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, activeTab, me?.id]);

  // Lógica de Curtida (Igual à da Home)
  const handleToggleLike = async (
    tweetId: string,
    isCurrentlyLiked: boolean,
  ) => {
    // 1. ATUALIZAÇÃO OTIMISTA (Igual à sua Home)
    setUserTweets((prevTweets) => {
      return prevTweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            likes: isCurrentlyLiked
              ? tweet.likes.filter(
                  (l: any) =>
                    (l.author?.id || l.userId) !== me?.id,
                )
              : [
                  ...(tweet.likes || []),
                  {
                    userId: me?.id,
                    tweetId: tweetId,
                  },
                ],
          };
        }
        return tweet;
      });
    });

    try {
      if (isCurrentlyLiked) {
        // DELETE exige a chave 'data' para enviar o body no Axios
        await api.delete("/likes", {
          data: { tweetId },
        });
      } else {
        // POST envia o body direto como segundo parâmetro
        await api.post("/likes", {
          tweetId,
        });
      }

      // Recarrega os dados em background para sincronizar com o servidor
      // sem mostrar o spinner de tela cheia
      const userResponse = await api.get(`/users/${id}`);
      const data =
        userResponse.data.data || userResponse.data;
      setUserData(data);

      const tweetsRes = await api.get(
        `/users/${id}/tweets`,
      );
      setUserTweets(tweetsRes.data.data || []);
    } catch (error) {
      console.error("Erro ao processar like: ", error);
      // Se der erro, você pode chamar o loadData() para reverter o estado otimista
      loadData();
      alert("Não foi possível processar o like.");
    }
  };

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSubmitting || !id) return;
    try {
      setIsSubmitting(true);
      if (isFollowing) {
        await api.delete("/followers", {
          data: { userId: id },
        });
      } else {
        await api.post("/followers", { userId: id });
      }
      setIsFollowing(!isFollowing);
      const refresh = await api.get(`/users/${id}`);
      setUserData(refresh.data.data || refresh.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <S.Container>
      <S.MainContent>
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
          <SpinnerContainer
            style={{
              background: "transparent",
              height: "300px",
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
                  <ProfileAvatar
                    src={
                      userData?.imageUrl ||
                      `https://ui-avatars.com/api/?name=${userData?.name}`
                    }
                  />

                  {id !== me?.id && (
                    <S.EditButton
                      onClick={handleFollow}
                      disabled={isSubmitting}
                      className={
                        isFollowing ? "following" : ""
                      }
                      style={{
                        backgroundColor: isFollowing
                          ? "#fff"
                          : "#1d9bf0",
                        color: isFollowing
                          ? "#0f1419"
                          : "#fff",
                        minWidth: "105px",
                        height: "36px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isSubmitting ? (
                        <ButtonSpinner
                          $isFollowing={isFollowing}
                        />
                      ) : isFollowing ? (
                        "Seguindo"
                      ) : (
                        "Seguir"
                      )}
                    </S.EditButton>
                  )}
                </div>

                <strong>{userData?.name}</strong>
                <span className="username">
                  @{userData?.username}
                </span>

                <S.StatsContainer>
                  <span>
                    <strong>{followingCount}</strong>{" "}
                    Seguindo
                  </span>
                  <span>
                    <strong>
                      {userData?.followers?.length || 0}
                    </strong>{" "}
                    Seguidores
                  </span>
                </S.StatsContainer>
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
                userTweets.map((tweet: any) => {
                  const isLikedByMe = tweet.likes?.some(
                    (l: any) =>
                      (l.author?.id || l.userId) === me?.id,
                  );

                  // Se estivermos na aba de tweets do próprio usuário, usamos userData.
                  // Se for a aba de curtidas, precisamos usar o autor original do tweet curtido.
                  const tweetAuthor =
                    activeTab === "likes"
                      ? tweet.author
                      : userData;

                  return (
                    <TweetCard
                      key={tweet.id}
                      id={tweet.id}
                      name={tweetAuthor?.name || "Usuário"}
                      username={
                        tweetAuthor?.username || "usuario"
                      }
                      content={tweet.content}
                      date={tweet.createdAt}
                      avatarUrl={tweetAuthor?.imageUrl}
                      likes={tweet.likes?.length || 0}
                      isLiked={!!isLikedByMe}
                      // Verifica se o tweet atual é uma resposta (ajuste conforme sua API)
                      isReply={!!tweet.parentTweetId}
                      onLike={() =>
                        handleToggleLike(
                          tweet.id,
                          !!isLikedByMe,
                        )
                      }
                      isAuthor={tweet.authorId === me?.id}
                    />
                  );
                })
              ) : (
                <EmptyMessage>
                  Nenhum{" "}
                  {activeTab === "tweets"
                    ? "tweet"
                    : activeTab === "replies"
                      ? "resposta"
                      : "curtida"}{" "}
                  para exibir.
                </EmptyMessage>
              )}
            </div>
          </>
        )}
      </S.MainContent>
    </S.Container>
  );
};
