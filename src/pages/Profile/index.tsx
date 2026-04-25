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

export const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myTweets, setMyTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tweets");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(user?.name || "");
  const [tempImageUrl, setTempImageUrl] = useState(user?.imageUrl || "");
  const [isSaving, setIsSaving] = useState(false);

  // 1. CARREGAR DADOS (Lógica similar ao loadTweets da Home)
  const loadProfileData = useCallback(async (silent = false) => {
    if (!user?.id) return;
    try {
      if (!silent) setLoading(true);
      
      let response;
      if (activeTab === "tweets") {
        response = await api.get(`/users/${user.id}/tweets`);
        setMyTweets(response.data.data || []);
      } else if (activeTab === "likes") {
        response = await api.get('/tweets');
        const all = response.data.data || [];
        const liked = all.filter((t: any) => 
          t.likes?.some((l: any) => l.userId === user.id)
        );
        setMyTweets(liked);
      } else {
        response = await api.get(`/users/${user.id}/tweets`);
        const replies = response.data.data?.filter((t: any) => t.type === "REPLY");
        setMyTweets(replies || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user?.id, activeTab]);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  // 2. FUNÇÃO DE LIKE (Igual à da Home com Atualização Otimista)
  const handleLikeTweet = async (tweetId: string, isCurrentlyLiked: boolean) => {
    // Atualização Visual Imediata
    setMyTweets((prev) => prev.map((t) => {
      if (t.id === tweetId) {
        return {
          ...t,
          likes: isCurrentlyLiked 
            ? t.likes.slice(0, -1) 
            : [...(t.likes || []), { userId: user?.id }]
        };
      }
      return t;
    }));

    try {
      if (isCurrentlyLiked) {
        await api.delete("/likes", { data: { tweetId } });
      } else {
        await api.post("/likes", { tweetId });
      }
      loadProfileData(true); // Atualiza em segundo plano
    } catch (error) {
      console.error(error);
      loadProfileData(true); // Reverte em caso de erro
    }
  };

  // 3. FUNÇÃO DE EXCLUIR (Igual à da Home)
  const handleDeleteTweet = async (tweetId: string) => {
    if (!window.confirm("Deseja realmente excluir este tweet?")) return;
    try {
      await api.delete(`/tweets/${tweetId}`);
      setMyTweets((prev) => prev.filter((t) => t.id !== tweetId));
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put(`/users/${user?.id}`, { name: tempName, imageUrl: tempImageUrl });
      setIsModalOpen(false);
      window.location.reload(); 
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
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
          <SpinnerContainer style={{ height: "calc(100vh - 60px)", width: "100%", backgroundColor: "transparent" }}>
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
                  <S.EditButton onClick={() => setIsModalOpen(true)}>Editar Perfil</S.EditButton>
                  
                  {isModalOpen && (
                    <S.ModalOverlay>
                      <S.ModalContent>
                        <header>
                          <div className="left-content">
                            <button type="button" className="close-button" onClick={() => setIsModalOpen(false)}><FiX size={22} /></button>
                            <h3>Editar Perfil</h3>
                          </div>
                          <button className="save-button" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? <StyledSpinner style={{ width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent" }} /> : <FiSave />}
                            Salvar
                          </button>
                        </header>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <S.AvatarRow>
                            <Avatar src={tempImageUrl || `https://ui-avatars.com/api/?name=${tempName}`} style={{ width: 133, height: 133, border: "4px solid white", marginBottom: "1rem" }} />
                          </S.AvatarRow>
                          <S.FloatingInputGroup>
                            <input autoFocus type="text" id="name" value={tempName} placeholder=" " onChange={(e) => setTempName(e.target.value)} />
                            <label htmlFor="name">Nome</label>
                          </S.FloatingInputGroup>
                          <S.FloatingInputGroup>
                            <input type="text" id="imageUrl" value={tempImageUrl} placeholder=" " onChange={(e) => setTempImageUrl(e.target.value)} />
                            <label htmlFor="imageUrl">URL da Imagem</label>
                          </S.FloatingInputGroup>
                        </form>
                      </S.ModalContent>
                    </S.ModalOverlay>
                  )}
                </div>
                <strong>{user?.name}</strong>
                <span className="username">@{user?.username}</span>
              </div>
            </S.ProfileHeader>

            <S.TabsContainer>
              <div className={activeTab === "tweets" ? "active" : ""} onClick={() => setActiveTab("tweets")}>Tweets</div>
              <div className={activeTab === "replies" ? "active" : ""} onClick={() => setActiveTab("replies")}>Respostas</div>
              <div className={activeTab === "likes" ? "active" : ""} onClick={() => setActiveTab("likes")}>Curtidas</div>
            </S.TabsContainer>

            <div>
              {myTweets.map((tweet: any) => {
                // Lógica de Identificação IGUAL à da Home
                const isLikedByMe = tweet.likes?.some((l: any) => l.userId === user?.id || l.author?.id === user?.id);
                const isMyTweet = String(tweet.author?.id || tweet.authorId) === String(user?.id);

                return (
                  <TweetCard
                    key={tweet.id}
                    name={tweet.author?.name || user?.name || ""}
                    username={tweet.author?.username || user?.username || ""}
                    content={tweet.content}
                    avatarUrl={tweet.author?.imageUrl || user?.imageUrl}
                    likes={tweet.likes?.length || 0}
                    isLiked={!!isLikedByMe}
                    isAuthor={isMyTweet}
                    onLike={() => handleLikeTweet(tweet.id, !!isLikedByMe)}
                    onDelete={() => handleDeleteTweet(tweet.id)}
                    onReply={() => navigate('/home')} // Ou abra seu modal
                  />
                );
              })}
            </div>
          </>
        )}
      </S.MainContent>
    </S.Container>
  );
};