import { useEffect, useState, useCallback } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { TweetCard } from "../../components/TweetCard";
import * as S from "./style";
import { TweetModal } from "../../components/TweetModal";
import { SpinnerContainer, StyledSpinner } from "../../components/Spinner/style";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");
  
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isPublishingReply, setIsPublishingReply] = useState(false);

  const loadTweets = useCallback(async (silent = false) => {
    if (!user?.id) return;
    try {
      if (!silent) setLoading(true);
      const url = activeTab === "following" ? "/feed" : "/tweets";
      const response = await api.get(url);
      setTweets(response.data.data || []);
    } catch (error) {
      console.error("Erro ao carregar tweets:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, user?.id]);

  useEffect(() => { loadTweets(); }, [loadTweets]);

  const handleLikeTweet = async (tweetId: string, isCurrentlyLiked: boolean) => {
    try {
      if (isCurrentlyLiked) {
        await api.delete("/likes", { data: { tweetId } });
      } else {
        await api.post("/likes", { tweetId });
      }
      loadTweets(true);
    } catch (error) {
      alert("Erro ao processar curtida");
    }
  };

  const handleDeleteTweet = async (tweetId: string) => {
    if (!window.confirm("Deseja excluir este tweet?")) return;
    try {
      await api.delete(`/tweets/${tweetId}`);
      loadTweets(true);
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
      loadTweets(true); // Recarrega para mostrar o comentário novo
    } catch (error) {
      alert("Erro ao responder");
    } finally {
      setIsPublishingReply(false);
    }
  };

  return (
    <>
      <S.PageHeader><h3>Página Inicial</h3></S.PageHeader>
      <S.TabsContainer>
        <S.Tab $active={activeTab === "forYou"} onClick={() => setActiveTab("forYou")}>Para você</S.Tab>
        <S.Tab $active={activeTab === "following"} onClick={() => setActiveTab("following")}>Seguindo</S.Tab>
      </S.TabsContainer>

      <S.FeedSection>
        {loading ? (
          <SpinnerContainer style={{ height: "300px", background: "transparent" }}><StyledSpinner /></SpinnerContainer>
        ) : (
          tweets
            .filter(t => !t.replyTo) // Mostra apenas tweets principais no feed
            .map((tweet) => {
              const isLiked = tweet.likes?.some((l: any) => (l.userId === user?.id || l.author?.id === user?.id));
              
              return (
                <S.TweetWrapper key={tweet.id}>
                  {/* Tweet Principal */}
                  <TweetCard
                    id={tweet.id}
                    name={tweet.author?.name}
                    username={tweet.author?.username}
                    content={tweet.content}
                    avatarUrl={tweet.author?.imageUrl}
                    date={tweet.createdAt}
                    likes={tweet.likes?.length || 0}
                    comments={tweet.replies?.length || 0}
                    isLiked={!!isLiked}
                    isAuthor={String(tweet.author?.id) === String(user?.id)}
                    onLike={() => handleLikeTweet(tweet.id, !!isLiked)}
                    onDelete={() => handleDeleteTweet(tweet.id)}
                    onReply={() => handleOpenReply(tweet.id)}
                    onProfileClick={() => navigate(`/profile/${tweet.author.id}`)}
                  />

                  {/* Renderização das Respostas (Comentários) logo abaixo */}
                  {tweet.replies && tweet.replies.length > 0 && (
                    <S.TweetContainer>
                      {tweet.replies.map((reply: any) => {
                        const isReplyLiked = reply.likes?.some((l: any) => (l.userId === user?.id || l.author?.id === user?.id));
                        return (
                          <TweetCard
                            key={reply.id}
                            id={reply.id}
                            isReply // Propriedade para estilo de comentário se existir no componente
                            name={reply.author?.name}
                            username={reply.author?.username}
                            content={reply.content}
                            avatarUrl={reply.author?.imageUrl}
                            date={reply.createdAt}
                            likes={reply.likes?.length || 0}
                            isLiked={!!isReplyLiked}
                            isAuthor={String(reply.author?.id) === String(user?.id)}
                            onLike={() => handleLikeTweet(reply.id, !!isReplyLiked)}
                            onDelete={() => handleDeleteTweet(reply.id)}
                            onReply={() => handleOpenReply(tweet.id)} // Responde ao principal
                          />
                        );
                      })}
                    </S.TweetContainer>
                  )}
                </S.TweetWrapper>
              );
            })
        )}
      </S.FeedSection>

      <TweetModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onSubmit={handleReplySubmit}
        value={replyContent}
        onChange={setReplyContent}
        isPublishing={isPublishingReply}
        title="Responder Tweet"
        avatarUrl={user?.imageUrl}
      />
    </>
  );
};