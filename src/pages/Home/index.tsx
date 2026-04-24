import { useEffect, useState, useCallback } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { TweetCard } from "../../components/TweetCard";
import * as S from "./style";
import logo from "../../assets/logo_growtweet.svg";
import { RiHome7Fill } from "react-icons/ri";
import { BsHash, BsPerson } from "react-icons/bs";
import { Button } from "../../components/Button";
import { TweetModal } from "../../components/TweetModal";
import {
  SpinnerContainer,
  StyledSpinner,
} from "../../components/Spinner/style";
import { Avatar } from "../../components/TweetCard/style";

interface Like {
  id: string;
  userId: string;
  tweetId: string;
}

// Interface ajustada para refletir o autor e as listas (likes/replies)
interface Tweet {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    username: string;
    imageUrl?: string;
  };
  likes: Like[];
  replies: any[];
  replyTo?: string; // ID do tweet original, se for uma resposta
}

export const Home = () => {
  const { user, signOut } = useAuth();
  const [tweets, setTweets] = useState<Tweet[]>([]);
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

  const loadTweets = useCallback(
    async (silent = false) => {
      if (!user?.id) return;

      try {
        // Só define loading se NÃO for uma atualização silenciosa
        if (!silent) {
          setLoading(true);
        }

        // Decidindo a rota baseada na aba
        // Para "Para você", usamos os tweets do próprio usuário logado
        const url =
          activeTab === "following"
            ? "/feed"
            : `/users/${user.id}/tweets`;

        const response = await api.get(url);
        console.log(response.data);

        const tweetsData = response.data.data || [];
        setTweets(tweetsData);

        console.log("Tweets carregados:", tweetsData);
      } catch (error) {
        console.error("Erro ao carregar tweets:", error);
      } finally {
        setLoading(false);
      }
    },
    [activeTab, user?.id],
  );

  useEffect(() => {
    loadTweets();
  }, [loadTweets]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!newTweet.trim()) return;

    try {
      setIsPublishing(true);

      // Se tiver selectedTweetId, envia para a rota de replies, se não, para tweets
      if (selectedTweetId) {
        await api.post("/replies", {
          content: newTweet,
          replyTo: selectedTweetId,
        });
      } else {
        await api.post("/tweets", {
          content: newTweet,
        });
      }

      setNewTweet("");
      // Recarrega a lista para mostrar o novo tweet imediatamente
      loadTweets();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao publicar tweet:", error);
      alert("Não foi possível publicar o tweet");
    } finally {
      setIsPublishing(false);
    }
  };

  // Função para abrir o modal (pode receber ID do tweet para reply)
  const handleOpenModal = (tweetId: string | null = null) => {
    // Se clicar no botão lateral, tweetId vem como evento ou undefined, 
    // então garantimos que seja null se não for string.
    const id = typeof tweetId === 'string' ? tweetId : null;
    setSelectedTweetId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTweetId(null); // Limpa a seleção ao fechar o modal
  };

  const handleLikeTweet = async (
    tweetId: string,
    isCurrentlyLiked: boolean,
  ) => {
    // ATUALIZAÇÃO OTIMISTA: Atualiza o estado local IMEDIATAMENTE
    setTweets((prevTweets: Tweet[]) => {
      return prevTweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            // Se estava curtido, remove um like fictício, se não, adiciona um
            likes: isCurrentlyLiked
              ? tweet.likes.slice(0, -1) // Remove o último (simulação)
              : user?.id
                ? [
                    ...tweet.likes,
                    {
                      id: `temp-${tweetId}-${user.id}`,
                      userId: user.id,
                      tweetId,
                    },
                  ]
                : tweet.likes,
          };
        }
        return tweet;
      });
    });

    try {
      if (isCurrentlyLiked) {
        // No DELETE, o segundo parâmetro são as configurações,
        // por isso usamos a chave 'data' aqui (está correto na sua versão).
        await api.delete("/likes", {
          data: {
            tweetId,
          },
        });
      } else {
        // No POST, o segundo parâmetro É o body.
        // REMOVA a chave 'data' daqui!
        await api.post("/likes", {
          tweetId,
        });
      }
      // Passamos 'true' para carregar os dados sem ativar o spinner de tela cheia
      await loadTweets(true);
    } catch (error) {
      console.error("Erro ao processar like: ", error);
      loadTweets(true); // Recarrega os dados para corrigir o estado otimista em caso de erro
      alert(
        "Não foi possível processar o like. Tente novamente.",
      );
    }
  };

  return (
    <S.Container>
      <S.SideBar>
        <div>
          <div className="logo">
            <img src={logo} alt="growtweet" />
          </div>
          <S.NavMenu>
            <S.NavList>
              <S.MenuItem
                $active={activeTab === "forYou"}
                onClick={() => setActiveTab("forYou")}
              >
                <RiHome7Fill size={24} /> Página Inicial
              </S.MenuItem>
              <S.MenuItem
                $active={activeTab === "following"}
                onClick={() => setActiveTab("following")}
              >
                <BsHash size={24} /> Explorar
              </S.MenuItem>
              <S.MenuItem $active={false}>
                <BsPerson size={24} /> Perfil
              </S.MenuItem>
            </S.NavList>
          </S.NavMenu>
          <Button
            $width="100%"
            $marginTop="1rem"
            onClick={() => handleOpenModal(null)}
          >
            Tweetar
          </Button>
        </div>

        <S.UserInfo onClick={signOut} style={{ cursor: 'pointer' }}>
          <Avatar
            src={
              user?.imageUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random`
            }
            alt={user?.name}
          />
          <S.NameContainer>
            <strong>{user?.name || "User"}</strong>
            <span>@{user?.username}</span>
          </S.NameContainer>
        </S.UserInfo>
      </S.SideBar>

      <S.MainContent>
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
                height: "500px",
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              <StyledSpinner />
            </SpinnerContainer>
          ) : tweets.length > 0 ? (
            tweets
              .filter((t) => !t.replyTo)
              .map((tweet) => {
                const isLikedByMe = tweet.likes?.some(
                  (like: any) => (like.author?.id === user?.id || like.userId === user?.id)
                );

                return (
                  <S.TweetWrapper key={tweet.id}>
                    {/* Tweet Principal */}
                    <TweetCard
                      name={tweet.author?.name || "Usuário"}
                      username={tweet.author?.username || "usuario"}
                      content={tweet.content}
                      avatarUrl={tweet.author?.imageUrl}
                      likes={tweet.likes?.length || 0}
                      comments={tweet.replies?.length || 0}
                      isLiked={!!isLikedByMe}
                      onLike={() => handleLikeTweet(tweet.id, !!isLikedByMe)}
                      onReply={() => handleOpenModal(tweet.id)}
                    />

                    {/* Renderização dos Comentários (Replies) */}
                    {tweet.replies && tweet.replies.length > 0 && (
                      <S.TweetContainer>
                        {tweet.replies.map((reply: any) => {
                          const isReplyLiked = reply.likes?.some(
                            (l: any) => l.userId === user?.id,
                          );
                          return (
                            <TweetCard
                              key={reply.id}
                              isReply
                              name={reply.author?.name || "Usuário"}
                              username={reply.author?.username || "usuario"}
                              content={reply.content}
                              avatarUrl={reply.author?.imageUrl}
                              likes={reply.likes?.length || 0}
                              isLiked={!!isReplyLiked}
                              onLike={() => handleLikeTweet(reply.id, !!isReplyLiked)}
                              onReply={() => handleOpenModal(reply.id)}
                            />
                          );
                        })}
                      </S.TweetContainer>
                    )}
                  </S.TweetWrapper>
                );
              })
          ) : (
            <p>Nenhum tweet encontrado. Que tal postar o primeiro?</p>
          )}
        </S.FeedSection>
      </S.MainContent>

      <S.WidgetsAside />

      <TweetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        value={newTweet}
        onChange={setNewTweet}
        isPublishing={isPublishing}
        avatarUrl={
          user?.imageUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "")}&background=random`
        }
        title={selectedTweetId ? "Responder Tweet" : "Criar Tweet"}
      />
    </S.Container>
  );
};
