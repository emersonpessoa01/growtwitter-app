import { useEffect, useState } from "react";
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
import { SpinnerWrapper } from "../../components/Button/style";

export const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myTweets, setMyTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tweets");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(
    user?.name || "",
  );
  const [tempImageUrl, setTempImageUrl] = useState(
    user?.imageUrl || "",
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadProfileData() {
      if (!user?.id) return;
      try {
        setLoading(true);
        // Buscando apenas os tweets deste usuário específico
        const response = await api.get(
          `/users/${user.id}/tweets`,
        );
        setMyTweets(response.data.data || []);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfileData();
  }, [user?.id]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulação de delay
      await new Promise((resolve) =>
        setTimeout(resolve, 2000),
      ); // Simulação
      setIsModalOpen(false);
      console.log("Salvando...");
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

        {/* O Spinner agora engloba todo o conteúdo abaixo do TopNav durante o loading */}
        {loading ? (
          <SpinnerContainer
            style={{
              height: "calc(100vh - 60px)", // Ocupa o restante da tela
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
                    onClick={() => setIsModalOpen(true)}
                  >
                    Editar Perfil
                  </S.EditButton>
                  {/* ESTRUTURA DO MODAL REFATORADA */}
                  {isModalOpen && (
                    <S.ModalOverlay>
                      <S.ModalContent>
                        <header>
                          {/* Agrupamento da esquerda (fechar + título) */}
                          <div className="left-content">
                            <button
                              type="button"
                              className="close-button"
                              onClick={() =>
                                setIsModalOpen(false)
                              }
                              aria-label="Fechar"
                            >
                              <FiX size={22} />
                            </button>
                            <h3>Editar Perfil</h3>
                          </div>

                          {/* Botão Salvar Pílula Azul */}
                          <button
                            className="save-button"
                            onClick={handleSave}
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
                                marginBottom: "1rem", // Espaço extra abaixo da imagem
                              }}
                            />
                          </S.AvatarRow>

                          <S.FloatingInputGroup>
                            <input
                              autoFocus
                              type="text"
                              id="name"
                              value={tempName}
                              placeholder=" " /* Necessário para a lógica do CSS */
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
                              URL da Imagem de Perfil
                            </label>
                          </S.FloatingInputGroup>
                          <span>
                            Insira aqui o link direto da sua
                            imagem (ex:
                            https://github.com/seu-usuario-aqui.png)
                          </span>
                        </form>
                      </S.ModalContent>
                    </S.ModalOverlay>
                  )}
                </div>
                <strong>{user?.name}</strong>
                <span className="username">
                  @{user?.username}
                </span>

                <S.StatsContainer>
                  <span>
                    <strong>0</strong> Seguindo
                  </span>
                  <span>
                    <strong>0</strong> Seguidores
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

            {/* Renderização Condicional de Conteúdo */}
            <div>
              {activeTab === "tweets" ? (
                myTweets.length > 0 ? (
                  myTweets.map((tweet: any) => (
                    <TweetCard
                      key={tweet.id}
                      name={user?.name || ""}
                      username={user?.username || ""}
                      content={tweet.content}
                      avatarUrl={user?.imageUrl}
                      likes={tweet.likes?.length || 0}
                      isAuthor={true}
                    />
                  ))
                ) : (
                  <p
                    style={{
                      padding: "2rem",
                      textAlign: "center",
                    }}
                  >
                    Você ainda não tweetou nada.
                  </p>
                )
              ) : (
                <p
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "#536471",
                  }}
                >
                  Ainda não há nada para mostrar em{" "}
                  {activeTab}.
                </p>
              )}
            </div>
          </>
        )}
      </S.MainContent>
    </S.Container>
  );
};
