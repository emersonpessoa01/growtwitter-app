import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { api } from "../../services/api";
import { TweetCard } from "../../components/TweetCard";
import * as S from "../Profile/style";
import {FeedSection, TweetContainer, TweetWrapper} from "../Home/style";
import { ButtonSpinner, EmptyMessage, ProfileAvatar } from "./style";
import { FiArrowLeft } from "react-icons/fi";
import { SpinnerContainer, StyledSpinner } from "../../components/Spinner/style";
import { useAuth } from "../../contexts/AuthContext";
import { TweetModal } from "../../components/TweetModal";

const tabLabels: Record<string, string> = {
  tweets: "tweet",
  replies: "resposta",
  likes: "curtida",
};

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

  // Estados para Modais (Igual à Home)
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isPublishingReply, setIsPublishingReply] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [isPublishingEdit, setIsPublishingEdit] = useState(false);

  const loadData = useCallback(async (silent = false) => {
    if (!id) return;
    try {
      if (!silent) setLoading(true);
      
      const userResponse = await api.get(`/users/${id}`);
      const data = userResponse.data.data || userResponse.data;
      setUserData(data);
      setIsFollowing(!!data.followers?.some((f: any) => (f.followerId || f.id) === me?.id));
      setFollowingCount(data.following?.length || 0);

      const tweetsRes = await api.get(`/users/${id}/tweets`);
      const tweetsData = tweetsRes.data.data || [];

      if (activeTab === "tweets") {
        setUserTweets(tweetsData);
      } else if (activeTab === "likes") {
        const allRes = await api.get("/tweets");
        const liked = (allRes.data.data || []).filter((t: any) =>
          t.likes?.some((l: any) => (l.userId || l.author?.id) === id),
        );
        setUserTweets(liked);
      } else {
        const replies = tweetsData.filter((t: any) => t.type === "REPLY" || !!t.replyTo);
        setUserTweets(replies);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, activeTab, me?.id]);

  // Handlers idênticos aos da Home
  const handleLikeTweet = async (tweetId: string, isCurrentlyLiked: boolean) => {
    try {
      if (isCurrentlyLiked) {
        await api.delete("/likes", { data: { tweetId } });
      } else {
        await api.post("/likes", { tweetId });
      }
      loadData(true);
    } catch (error) {
      alert("Erro ao processar curtida");
    }
  };

  const handleDeleteTweet = async (tweetId: string) => {
    if (!window.confirm("Deseja excluir este tweet?")) return;
    try {
      await api.delete(`/tweets/${tweetId}`);
      loadData(true);
    } catch (error) {
      alert("Erro ao deletar");
    }
  };

  const handleOpenReply = (id: string) => {
    setSelectedTweetId(id);
    setIsReplyModalOpen(true);
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    try {
      setIsPublishingReply(true);
      await api.post("/replies", { content: replyContent, replyTo: selectedTweetId });
      setReplyContent("");
      setIsReplyModalOpen(false);
      loadData(true);
    } catch (error) {
      alert("Erro ao responder");
    } finally {
      setIsPublishingReply(false);
    }
  };

  const handleOpenEdit = (id: string, content: string) => {
    setSelectedTweetId(id);
    setEditContent(content);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editContent.trim() || !selectedTweetId) return;
    try {
      setIsPublishingEdit(true);
      await api.put(`/tweets/${selectedTweetId}`, { content: editContent });
      setIsEditModalOpen(false);
      loadData(true);
    } catch (error) {
      alert("Erro ao editar tweet");
    } finally {
      setIsPublishingEdit(false);
    }
  };

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSubmitting || !id) return;
    try {
      setIsSubmitting(true);
      if (isFollowing) {
        await api.delete("/followers", { data: { userId: id } });
      } else {
        await api.post("/followers", { userId: id });
      }
      loadData(true);
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
          <div className="back-button" onClick={() => navigate(-1)}>
            <FiArrowLeft size={20} />
          </div>
          <div className="user-info">
            <h2>{userData?.name || initialUsername || "Perfil"}</h2>
            <span>{userTweets.length} Tweets</span>
          </div>
        </S.TopNav>

        {loading ? (
          <SpinnerContainer style={{ background: "transparent", height: "300px" }}>
            <StyledSpinner />
          </SpinnerContainer>
        ) : (
          <>
            <S.ProfileHeader>
              <div className="banner" />
              <div className="info">
                <div className="avatar-row">
                  <ProfileAvatar src={userData?.imageUrl || `https://ui-avatars.com/api/?name=${userData?.name}`} />
                  {id !== me?.id && (
                    <S.EditButton
                      onClick={handleFollow}
                      disabled={isSubmitting}
                      className={isFollowing ? "following" : ""}
                    >
                      {isSubmitting ? <ButtonSpinner $isFollowing={isFollowing} /> : isFollowing ? "Seguindo" : "Seguir"}
                    </S.EditButton>
                  )}
                </div>
                <strong>{userData?.name}</strong>
                <span className="username">@{userData?.username}</span>
                <S.StatsContainer>
                  <span><strong>{followingCount}</strong> Seguindo</span>
                  <span><strong>{userData?.followers?.length || 0}</strong> Seguidores</span>
                </S.StatsContainer>
              </div>
            </S.ProfileHeader>

            <S.TabsContainer>
              <div className={activeTab === "tweets" ? "active" : ""} onClick={() => setActiveTab("tweets")}>Tweets</div>
              <div className={activeTab === "replies" ? "active" : ""} onClick={() => setActiveTab("replies")}>Respostas</div>
              <div className={activeTab === "likes" ? "active" : ""} onClick={() => setActiveTab("likes")}>Curtidas</div>
            </S.TabsContainer>

            <FeedSection>
              {userTweets.length > 0 ? (
                userTweets
                  .filter((t) => activeTab !== "tweets" || !t.replyTo) // Lógica de filtro da Home
                  .map((tweet: any) => {
                    const isLiked = tweet.likes?.some(
                      (l: any) => (l.userId || l.author?.id) === me?.id
                    );
                    const tweetAuthor = activeTab === "likes" ? tweet.author : userData;

                    return (
                      <TweetWrapper key={tweet.id}>
                        <TweetCard
                          id={tweet.id}
                          name={tweetAuthor?.name}
                          username={tweetAuthor?.username}
                          content={tweet.content}
                          avatarUrl={tweetAuthor?.imageUrl}
                          date={tweet.createdAt}
                          likes={tweet.likes?.length || 0}
                          comments={tweet.replies?.length || 0}
                          isLiked={!!isLiked}
                          isAuthor={(tweet.authorId || tweet.author?.id) === me?.id}
                          onLike={() => handleLikeTweet(tweet.id, !!isLiked)}
                          onDelete={() => handleDeleteTweet(tweet.id)}
                          onReply={() => handleOpenReply(tweet.id)}
                          onEdit={() => handleOpenEdit(tweet.id, tweet.content)}
                        />

                        {/* Renderização aninhada exatamente como na Home */}
                        {activeTab === "tweets" && tweet.replies && tweet.replies.length > 0 && (
                          <TweetContainer>
                            {tweet.replies.map((reply: any) => {
                              const isReplyLiked = reply.likes?.some(
                                (l: any) => (l.userId || l.author?.id) === me?.id
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
                                  isAuthor={(reply.authorId || reply.author?.id) === me?.id}
                                  onLike={() => handleLikeTweet(reply.id, !!isReplyLiked)}
                                  onDelete={() => handleDeleteTweet(reply.id)}
                                  onEdit={() => handleOpenEdit(reply.id, reply.content)}
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

      <TweetModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onSubmit={handleReplySubmit}
        value={replyContent}
        onChange={setReplyContent}
        isPublishing={isPublishingReply}
        title="Responder Tweet"
        avatarUrl={me?.imageUrl}
      />
      <TweetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        value={editContent}
        onChange={setEditContent}
        isPublishing={isPublishingEdit}
        title="Editar Tweet"
        avatarUrl={me?.imageUrl}
      />
    </S.Container>
  );
};