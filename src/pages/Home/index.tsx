import { useEffect, useState, useCallback } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { TweetCard } from "../../components/TweetCard";
import * as S from "./style";
import { TweetModal } from "../../components/TweetModal";
import {
  SpinnerContainer,
  StyledSpinner,
} from "../../components/Spinner/style";
import { useNavigate } from "react-router-dom";
import { EmptyMessage } from "../UserProfile/style";

const tabLabels: Record<string, string> = {
  tweets: "tweet",
  replies: "resposta",
  likes: "curtida",
};

export const Home = () => {
  const { user } = useAuth();
  const [tweets, setTweets] = useState<any[]>([]);
  const [newTweet, setNewTweet] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "forYou" | "following"
  >("forYou");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  const loadTweets = useCallback(
    async (silent = false) => {
      if (!user?.id) return;
      try {
        if (!silent) setLoading(true);
        const url =
          activeTab === "following" ? "/feed" : "/tweets";
        const response = await api.get(url);
        setTweets(response.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [activeTab, user?.id],
  );

  useEffect(() => {
    loadTweets();
  }, [loadTweets]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTweet.trim()) return;
    try {
      setIsPublishing(true);
      if (selectedTweetId) {
        await api.post("/replies", {
          content: newTweet,
          replyTo: selectedTweetId,
        });
      } else {
        await api.post("/tweets", { content: newTweet });
      }
      setNewTweet("");
      loadTweets();
      handleCloseModal();
    } catch (error) {
      alert("Erro ao publicar");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleOpenModal = (id: string | null = null) => {
    setSelectedTweetId(typeof id === "string" ? id : null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTweetId(null);
  };

  return (
    <>
      <S.PageHeader>
        <h3>Página Inicial</h3>
      </S.PageHeader>

      <S.TabsContainer>
        <S.Tab
          $active={activeTab === "forYou"}
          onClick={() => setActiveTab("forYou")}
        >
          Para você
        </S.Tab>
        <S.Tab
          $active={activeTab === "following"}
          onClick={() => setActiveTab("following")}
        >
          Seguindo
        </S.Tab>
      </S.TabsContainer>

      <S.FeedSection>
        {loading ? (
          <SpinnerContainer
            style={{
              height: "300px",
              background: "transparent",
            }}
          >
            <StyledSpinner />
          </SpinnerContainer>
        ) : tweets.length > 0 ? (
          tweets
            .filter((t) => !t.replyTo)
            .map((tweet) => (
              <S.TweetWrapper key={tweet.id}>
                <TweetCard
                  id={tweet.id}
                  name={tweet.author?.name}
                  username={tweet.author?.username}
                  content={tweet.content}
                  avatarUrl={tweet.author?.imageUrl}
                  date={tweet.createdAt}
                  likes={tweet.likes?.length || 0}
                  comments={tweet.replies?.length || 0}
                  isLiked={tweet.likes?.some(
                    (l: any) => l.userId === user?.id,
                  )}
                  onReply={() => handleOpenModal(tweet.id)}
                  onProfileClick={() =>
                    navigate(`/profile/${tweet.author.id}`)
                  }
                  // ... (outras props de like/delete que você já tem)
                />
              </S.TweetWrapper>
            ))
        ) : (
          <EmptyMessage>
            Nenhum {tabLabels[activeTab]} para exibir.
          </EmptyMessage>
        )}
      </S.FeedSection>

      <TweetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        value={newTweet}
        onChange={setNewTweet}
        isPublishing={isPublishing}
        title={
          selectedTweetId
            ? "Responder Tweet"
            : "Criar Tweet"
        }
      />
    </>
  );
};
