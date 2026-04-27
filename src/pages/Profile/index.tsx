import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { TweetCard } from "../../components/TweetCard";
import * as S from "./style";
import { Avatar } from "../../components/TweetCard/style";
import {
  SpinnerContainer,
  StyledSpinner,
} from "../../components/Spinner/style";
import { FiArrowLeft, FiX, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
// Importações adicionadas para o Modal
import { TweetModal } from "../../components/TweetModal";
import { EmptyMessage } from "../UserProfile/style";

const tabLabels: Record<string, string> = {
  tweets: "tweet",
  replies: "resposta",
  likes: "curtida",
};

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [myTweets, setMyTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tweets");
  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false); // Renomeado para evitar conflito
  const [tempName, setTempName] = useState(
    user?.name || "",
  );
  const [tempImageUrl, setTempImageUrl] = useState(
    user?.imageUrl || "",
  );
  const [isSaving, setIsSaving] = useState(false);

  // Estados para o TweetModal (Lógica da Home)
  const [isTweetModalOpen, setIsTweetModalOpen] =
    useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState<
    string | null
  >(null);
  const [replyContent, setReplyContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const loadProfileData = useCallback(
    async (silent = false) => {
      if (!user?.id) return;
      try {
        if (!silent) setLoading(true);

        let response;
        if (activeTab === "tweets") {
          response = await api.get(
            `/users/${user.id}/tweets`,
          );
          setMyTweets(response.data.data || []);
        } else if (activeTab === "likes") {
          response = await api.get("/tweets");
          const all = response.data.data || [];
          const liked = all.filter((t: any) =>
            t.likes?.some((l: any) => l.userId === user.id),
          );
          setMyTweets(liked);
        } else {
          response = await api.get(
            `/users/${user.id}/tweets`,
          );
          const replies = response.data.data?.filter(
            (t: any) => t.type === "REPLY",
          );
          setMyTweets(replies || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [user?.id, activeTab],
  );

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  // Lógica de Resposta (Igual à Home)
  const handleOpenReplyModal = (tweetId: string) => {
    setSelectedTweetId(tweetId);
    setIsTweetModalOpen(true);
  };

  const handleCloseTweetModal = () => {
    setIsTweetModalOpen(false);
    setSelectedTweetId(null);
    setReplyContent("");
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !selectedTweetId) return;

    try {
      setIsPublishing(true);
      await api.post("/replies", {
        content: replyContent,
        replyTo: selectedTweetId,
      });

      handleCloseTweetModal();
      loadProfileData(true); // Recarrega os dados silenciosamente
    } catch (error) {
      console.error("Erro ao responder:", error);
      alert("Não foi possível enviar a resposta.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleLikeTweet = async (
    tweetId: string,
    isCurrentlyLiked: boolean,
  ) => {
    setMyTweets((prev) =>
      prev.map((t) => {
        if (t.id === tweetId) {
          return {
            ...t,
            likes: isCurrentlyLiked
              ? t.likes.filter(
                  (l: any) => l.userId !== user?.id,
                )
              : [
                  ...(t.likes || []),
                  {
                    userId: user?.id,
                  },
                ],
          };
        }
        return t;
      }),
    );

    try {
      if (isCurrentlyLiked) {
        await api.delete("/likes", {
          data: {
            tweetId,
          },
        });
      } else {
        await api.post("/likes", {
          tweetId,
        });
      }
      loadProfileData(true);
    } catch (error) {
      console.error(error);
      loadProfileData(true);
    }
  };

  const handleDeleteTweet = async (tweetId: string) => {
    if (
      !window.confirm(
        "Deseja realmente excluir este tweet?",
      )
    )
      return;
    try {
      await api.delete(`/tweets/${tweetId}`);
      setMyTweets((prev) =>
        prev.filter((t) => t.id !== tweetId),
      );
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar");
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;
    setIsSaving(true);

    try {
      // Ajuste da rota para incluir o ID do usuário
      const response = await api.put(`/users/${user.id}`, {
        name: tempName,
        imageUrl: tempImageUrl,
      });

      const updatedUser = response.data.data;

      // Atualiza o usuário no contexto
      updateUser(updatedUser);

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert(
        "Não foi possível atualizar o perfil. Verifique a conexão com a API.",
      );
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <S.Container>
      <S.MainContent>
        <S.TopNav>
          <div
            className="back-button"
            onClick={() => navigate("/home")}
          >
            <FiArrowLeft size={20} />
          </div>
          <div className="user-info">
            <h2>{user?.name}</h2>
            <span>{myTweets.length} Tweets</span>
          </div>
        </S.TopNav>

        {loading ? (
          <SpinnerContainer
            style={{
              height: "calc(100vh - 60px)",
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
                    src={
                      user?.imageUrl ||
                      `https://ui-avatars.com/api/?name=${user?.name}`
                    }
                    style={{
                      width: 133,
                      height: 133,
                      border: "4px solid white",
                    }}
                  />
                  <S.EditButton
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    Editar Perfil
                  </S.EditButton>

                  {isEditModalOpen && (
                    <S.ModalOverlay>
                      <S.ModalContent>
                        <header>
                          <div className="left-content">
                            <button
                              type="button"
                              className="close-button"
                              onClick={() =>
                                setIsEditModalOpen(false)
                              }
                              aria-label="Fechar"
                              title="Fechar"
                            >
                              <FiX size={22} />
                            </button>
                            <h3>Editar Perfil</h3>
                          </div>
                          <button
                            className="save-button"
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <StyledSpinner
                                style={{
                                  width: 16,
                                  height: 16,
                                  border: "2px solid #fff",
                                  borderTopColor:
                                    "transparent",
                                }}
                              />
                            ) : (
                              <FiSave />
                            )}
                            Salvar
                          </button>
                        </header>
                        <form
                          onSubmit={(e) =>
                            e.preventDefault()
                          }
                        >
                          <S.AvatarRow>
                            <Avatar
                              src={
                                tempImageUrl ||
                                `https://ui-avatars.com/api/?name=${tempName}`
                              }
                              style={{
                                width: 133,
                                height: 133,
                                border: "4px solid white",
                                marginBottom: "1rem",
                              }}
                            />
                          </S.AvatarRow>
                          <S.FloatingInputGroup>
                            <input
                              autoFocus
                              type="text"
                              id="name"
                              value={tempName}
                              placeholder=" "
                              onChange={(e) =>
                                setTempName(e.target.value)
                              }
                            />
                            <label htmlFor="name">
                              Nome
                            </label>
                          </S.FloatingInputGroup>
                          <S.FloatingInputGroup>
                            <input
                              type="text"
                              id="imageUrl"
                              value={tempImageUrl}
                              placeholder=" "
                              onChange={(e) =>
                                setTempImageUrl(
                                  e.target.value,
                                )
                              }
                            />
                            <label htmlFor="imageUrl">
                              URL da Imagem
                            </label>
                          </S.FloatingInputGroup>
                        </form>
                      </S.ModalContent>
                    </S.ModalOverlay>
                  )}
                </div>
                <strong>{user?.name}</strong>
                <span className="username">
                  @{user?.username}
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
              {myTweets.length > 0 ? (
                myTweets.map((tweet: any) => {
                  const isLikedByMe = tweet.likes?.some(
                    (l: any) =>
                      l.userId === user?.id ||
                      l.author?.id === user?.id,
                  );
                  const isMyTweet =
                    String(
                      tweet.author?.id || tweet.authorId,
                    ) === String(user?.id);

                  return (
                    <TweetCard
                      key={tweet.id}
                      id={tweet.id}
                      name={
                        tweet.author?.name ||
                        user?.name ||
                        ""
                      }
                      username={
                        tweet.author?.username ||
                        user?.username ||
                        ""
                      }
                      content={tweet.content}
                      date={tweet.createdAt}
                      avatarUrl={
                        tweet.author?.imageUrl ||
                        user?.imageUrl
                      }
                      likes={tweet.likes?.length || 0}
                      comments={tweet.replies?.length || 0} // Adicionado contador de respostas
                      isLiked={!!isLikedByMe}
                      isAuthor={isMyTweet}
                      onLike={() =>
                        handleLikeTweet(
                          tweet.id,
                          !!isLikedByMe,
                        )
                      }
                      onDelete={() =>
                        handleDeleteTweet(tweet.id)
                      }
                      onReply={() =>
                        handleOpenReplyModal(tweet.id)
                      } // Agora abre o modal corretamente
                    />
                  );
                })
              ) : (
                <EmptyMessage>
                  Nenhum {tabLabels[activeTab]} para exibir.
                </EmptyMessage>
              )}
            </div>
          </>
        )}
      </S.MainContent>

      {/* Modal de Resposta importado da Home */}
      <TweetModal
        isOpen={isTweetModalOpen}
        onClose={handleCloseTweetModal}
        onSubmit={handleReplySubmit}
        value={replyContent}
        onChange={setReplyContent}
        isPublishing={isPublishing}
        avatarUrl={
          user?.imageUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "")}`
        }
        title="Responder Tweet"
      />
    </S.Container>
  );
};
