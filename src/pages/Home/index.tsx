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
import { SpinnerContainer, StyledSpinner } from "../../components/Spinner/style";

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
  likes: number[];
  replies: number[];
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

  const loadTweets = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      // Decidindo a rota baseada na aba
      // Para "Para você", usamos os tweets do próprio usuário logado
      const url =
        activeTab === "following"
          ? "/feed"
          : `/users/${user.id}/tweets`;

      const response = await api.get(url);

      const tweetsData = response.data.data || [];
      setTweets(tweetsData);

      console.log("Tweets carregados:", tweetsData);
    } catch (error) {
      console.error("Erro ao carregar tweets:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, user?.id]);

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
          <strong>{user?.name}</strong>
          <span>@{user?.username}</span>
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
            <SpinnerContainer style={{ height: "500px", width: "100%" }}>
              <StyledSpinner />
            </SpinnerContainer>
          ) : tweets.length > 0 ? (
            tweets.map((tweet) => (
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
                isLiked={false} // Você poderá implementar a lógica de check depois
              />
            ))
          ) : (
            <p
              style={{
                padding: "20px",
                textAlign: "center",
              }}
            >
              Nenhum tweet encontrado. Que tal postar o
              primeiro?
            </p>
          )}
        </S.FeedSection>
      </S.MainContent>

      <S.WidgetsAside />
      {/* O resto do código da Home continua igual, apenas removemos o form fixo e adicionamos o modal aqui */}
      <TweetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        value={newTweet}
        onChange={setNewTweet}
        isPublishing={isPublishing}
      />
    </S.Container>
  );
};
