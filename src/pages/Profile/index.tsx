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
import { TweetModal } from "../../components/TweetModal";
import { EmptyMessage } from "../UserProfile/style";
// Importando os containers de estilo que fazem a linha vertical e o recuo das respostas
import { FeedSection, TweetContainer, TweetWrapper } from "../Home/style";

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

  // --- ESTADOS DE EDIÇÃO DE PERFIL ---
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [tempName, setTempName] = useState(user?.name || "");
  const [tempImageUrl, setTempImageUrl] = useState(user?.imageUrl || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // --- ESTADOS DE TWEETS (Lógica da Home) ---
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isEditTweetModalOpen, setIsEditTweetModalOpen] = useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const loadProfileData = useCallback(
    async (silent = false) => {
      if (!user?.id) return;
      try {
        if (!silent) setLoading(true);

        let response;
        if (activeTab === "tweets") {
          response = await api.get(`/users/${user.id}/tweets`);
          setMyTweets(response.data.data || []);
        } else if (activeTab === "likes") {
          response = await api.get("/tweets");
          const all = response.data.data || [];
          const liked = all.filter((t: any) =>
            t.likes?.some((l: any) => l.userId === user.id)
          );
          setMyTweets(liked);
        } else {
          response = await api.get(`/users/${user.id}/tweets`);
          const replies = response.data.data?.filter(
            (t: any) => t.type === "REPLY" || !!t.replyTo
          );
          setMyTweets(replies || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [user?.id, activeTab]
  );

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  // --- HANDLERS DE AÇÃO (Igual à Home) ---
  const handleLikeTweet = async (tweetId: string, isCurrentlyLiked: boolean) => {
    try {
      if (isCurrentlyLiked) {
        await api.delete("/likes", { data: { tweetId } });
      } else {
        await api.post("/likes", { tweetId });
      }
      loadProfileData(true);
    } catch (error) {
      alert("Erro ao processar curtida");
    }
  };

  const handleDeleteTweet = async (tweetId: string) => {
    if (!window.confirm("Deseja excluir este tweet?")) return;
    try {
      await api.delete(`/tweets/${tweetId}`);
      loadProfileData(true);
    } catch (error) {
      alert("Erro ao deletar");
    }
  };

  const handleOpenReply = (id: string) => {
    setSelectedTweetId(id);
    setReplyContent("");
    setIsReplyModalOpen(true);
  };

  const handleOpenEdit = (id: string, content: string) => {
    setSelectedTweetId(id);
    setEditContent(content);
    setIsEditTweetModalOpen(true);
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    try {
      setIsPublishing(true);
      await api.post("/replies", { content: replyContent, replyTo: selectedTweetId });
      setIsReplyModalOpen(false);
      setReplyContent("");
      loadProfileData(true);
    } catch (error) {
      alert("Erro ao responder");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editContent.trim() || !selectedTweetId) return;
    try {
      setIsPublishing(true);
      await api.put(`/tweets/${selectedTweetId}`, { content: editContent });
      setIsEditTweetModalOpen(false);
      loadProfileData(true);
    } catch (error) {
      alert("Erro ao editar tweet");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;
    setIsSavingProfile(true);
    try {
      const response = await api.put(`/users/${user.id}`, { name: tempName, imageUrl: tempImageUrl });
      updateUser(response.data.data);
      setIsEditProfileModalOpen(false);
    } catch (error) {
      alert("Erro ao atualizar perfil");
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <S.Container>
      <S.MainContent>
        <S.TopNav>
          <div className="back-button" onClick={() => navigate("/home")}>
            <FiArrowLeft size={20} />
          </div>
          <div className="user-info">
            <h2>{user?.name}</h2>
            <span>{myTweets.length} Tweets</span>
          </div>
        </S.TopNav>

        {loading ? (
          <SpinnerContainer style={{ height: "300px", background: "transparent" }}>
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
                    style={{ width: 133, height: 133, border: "4px solid white" }}
                  />
                  <S.EditButton onClick={() => setIsEditProfileModalOpen(true)}>
                    Editar Perfil
                  </S.EditButton>
                </div>
                <strong>{user?.name}</strong>
                <span className="username">@{user?.username}</span>
              </div>
            </S.ProfileHeader>

            <S.TabsContainer>
              {["tweets", "replies", "likes"].map((tab) => (
                <div key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
                  {tab === "tweets" ? "Tweets" : tab === "replies" ? "Respostas" : "Curtidas"}
                </div>
              ))}
            </S.TabsContainer>

            <FeedSection>
              {myTweets.length > 0 ? (
                myTweets
                  .filter((t) => activeTab !== "tweets" || !t.replyTo) // Lógica de filtro da Home
                  .map((tweet: any) => {
                    const isLiked = tweet.likes?.some(
                      (l: any) => l.userId === user?.id || l.author?.id === user?.id
                    );

                    return (
                      <TweetWrapper key={tweet.id}>
                        <TweetCard
                          id={tweet.id}
                          name={tweet.author?.name || user?.name}
                          username={tweet.author?.username || user?.username}
                          content={tweet.content}
                          avatarUrl={tweet.author?.imageUrl || user?.imageUrl}
                          date={tweet.createdAt}
                          likes={tweet.likes?.length || 0}
                          comments={tweet.replies?.length || 0}
                          isLiked={!!isLiked}
                          isAuthor={String(tweet.author?.id || tweet.authorId) === String(user?.id)}
                          onLike={() => handleLikeTweet(tweet.id, !!isLiked)}
                          onDelete={() => handleDeleteTweet(tweet.id)}
                          onReply={() => handleOpenReply(tweet.id)}
                          onEdit={() => handleOpenEdit(tweet.id, tweet.content)}
                        />

                        {/* LÓGICA DE RESPOSTAS (IGUAL À HOME) */}
                        {activeTab === "tweets" && tweet.replies && tweet.replies.length > 0 && (
                          <TweetContainer>
                            {tweet.replies.map((reply: any) => {
                              const isReplyLiked = reply.likes?.some(
                                (l: any) => l.userId === user?.id || l.author?.id === user?.id
                              );
                              return (
                                <TweetCard
                                  key={reply.id}
                                  id={reply.id}
                                  isReply
                                  name={reply.author?.name}
                                  username={reply.author?.username}
                                  content={reply.content}
                                  avatarUrl={reply.author?.imageUrl}
                                  date={reply.createdAt}
                                  likes={reply.likes?.length || 0}
                                  isLiked={!!isReplyLiked}
                                  isAuthor={String(reply.author?.id) === String(user?.id)}
                                  onLike={() => handleLikeTweet(reply.id, !!isReplyLiked)}
                                  onEdit={() => handleOpenEdit(reply.id, reply.content)}
                                  onDelete={() => handleDeleteTweet(reply.id)}
                                  onReply={() => handleOpenReply(tweet.id)}
                                />
                              );
                            })}
                          </TweetContainer>
                        )}
                      </TweetWrapper>
                    );
                  })
              ) : (
                <EmptyMessage>Nenhum {tabLabels[activeTab]} para exibir.</EmptyMessage>
              )}
            </FeedSection>
          </>
        )}
      </S.MainContent>

      {/* MODAIS DE TWEET (REPLY E EDIT) */}
      <TweetModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onSubmit={handleReplySubmit}
        value={replyContent}
        onChange={setReplyContent}
        isPublishing={isPublishing}
        title="Responder Tweet"
        avatarUrl={user?.imageUrl}
      />

      <TweetModal
        isOpen={isEditTweetModalOpen}
        onClose={() => setIsEditTweetModalOpen(false)}
        onSubmit={handleEditSubmit}
        value={editContent}
        onChange={setEditContent}
        isPublishing={isPublishing}
        title="Editar Tweet"
        avatarUrl={user?.imageUrl}
      />

      {/* MODAL DE EDIÇÃO DE PERFIL */}
      {isEditProfileModalOpen && (
        <S.ModalOverlay>
          <S.ModalContent>
            <header>
              <div className="left-content">
                <button type="button" className="close-button" onClick={() => setIsEditProfileModalOpen(false)} title="Editar">
                  <FiX size={22} />
                </button>
                <h3>Editar Perfil</h3>
              </div>
              <button className="save-button" onClick={handleSaveProfile} disabled={isSavingProfile}>
                {isSavingProfile ? <StyledSpinner style={{ width: 16, height: 16 }} /> : <FiSave />}
                Salvar
              </button>
            </header>
            <form>
              <Avatar src={tempImageUrl || user?.imageUrl} style={{ width: 133, height: 133, marginBottom: "1rem" }} />
              <S.FloatingInputGroup>
                <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} placeholder=" " title="Nome" />
                <label>Nome</label>
              </S.FloatingInputGroup>
              <S.FloatingInputGroup>
                <input type="text" value={tempImageUrl} onChange={(e) => setTempImageUrl(e.target.value)} placeholder=" " title="URL da imagem" />
                <label>URL da Imagem</label>
              </S.FloatingInputGroup>
            </form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};