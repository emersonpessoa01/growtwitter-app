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

      // Endpoint POST /tweets conforme a documentação
      await api.post("/tweets", {
        content: newTweet,
      });

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

  // Função para abrir e fechar o modal de publicar tweet
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      alert("Não foi possível processar o like. Tente novamente.");
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
            onClick={handleOpenModal}
          >
            Tweetar
          </Button>
        </div>

        <S.UserInfo onClick={signOut}>
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
            tweets.map((tweet) => {
              const isLikedByMe = tweet.likes?.some(
                (like: any) => {
                  return (
                    like.author?.id === user?.id ||
                    like.userId === user?.id
                  );
                },
              );

              return (
                <TweetCard
                  key={tweet.id}
                  name={tweet.author?.name || "Usuário"}
                  username={
                    tweet.author?.username || "usuario"
                  }
                  content={tweet.content}
                  avatarUrl={tweet.author?.imageUrl}
                  likes={tweet.likes?.length || 0}
                  comments={tweet.replies?.length || 0}
                  isLiked={isLikedByMe} // Passa o valor correto
                  onLike={() =>
                    handleLikeTweet(tweet.id, isLikedByMe)
                  } // Passa a função com o estado atual
                />
              );
            })
          ) : (
            <p>
              Nenhum tweet encontrado. Que tal postar o
              primeiro?
            </p>
          )}
        </S.FeedSection>
      </S.MainContent>

      <S.WidgetsAside />
      {/* O resto do código da Home continua igual, apenas foi removido o form fixo e adicionado o modal aqui */}
      <TweetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        value={newTweet}
        onChange={setNewTweet}
        isPublishing={isPublishing}
        // Agora o modal olha para o dono da conta ou gera as iniciais dele
        avatarUrl={
          user?.imageUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "")}&background=random`
        }
      />
    </S.Container>
  );
};
