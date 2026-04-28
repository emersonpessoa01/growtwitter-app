import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import * as S from "../pages/Home/style";
import { WhoToFollow } from "../components/WhoToFollow";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import logo from "../assets/images/logo_growtweet.svg";
import { RiHome7Fill } from "react-icons/ri";
import {
  BsHash,
  BsPerson,
  BsSun,
  BsMoonStars,
} from "react-icons/bs";
import { Button } from "../components/Button";
import { Avatar } from "../components/TweetCard/style";
import { TweetModal } from "../components/TweetModal";

interface DefaultLayoutProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export const DefaultLayout = ({
  toggleTheme,
  isDarkMode,
}: DefaultLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTweet, setNewTweet] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTweet("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTweet.trim()) return;

    try {
      setIsPublishing(true);
      await api.post("/tweets", { content: newTweet });
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      alert("Erro ao publicar tweet");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <S.Container>
      <S.SideBar>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2rem",
              paddingRight: "10px",
            }}
          >
            <div
              className="logo"
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
                padding: "10px 0",
              }}
            >
              {/* Aumentado para 130px para ficar proporcional aos ícones */}
              <img
                src={logo}
                alt="growtweet"
                style={{ width: "130px", height: "auto" }}
              />
            </div>

            <div
              onClick={toggleTheme}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {isDarkMode ? (
                <BsSun size={24} color="#f2f2f2" />
              ) : (
                <BsMoonStars size={24} color="#4f4f4f" />
              )}
            </div>
          </div>

          <S.NavMenu>
            <S.NavList>
              <S.MenuItem
                $active={location.pathname === "/"}
                onClick={() => navigate("/")}
              >
                <RiHome7Fill size={24} /> Página Inicial
              </S.MenuItem>
              <S.MenuItem
                $active={location.pathname === "/explorer"}
                onClick={() => navigate("/explorer")}
              >
                <BsHash size={24} /> Explorar
              </S.MenuItem>
              <S.MenuItem
                $active={location.pathname === "/profile"}
                onClick={() => navigate("/profile")}
              >
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

        <S.UserInfo
          onClick={signOut}
          style={{ cursor: "pointer" }}
        >
          <Avatar
            src={
              user?.imageUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=random`
            }
            alt={user?.name}
          />
          <S.NameContainer>
            <strong>{user?.name}</strong>
            <span>@{user?.username}</span>
          </S.NameContainer>
        </S.UserInfo>
      </S.SideBar>

      <S.MainContent>
        <Outlet />
      </S.MainContent>

      <S.WidgetsAside>
        <WhoToFollow />
      </S.WidgetsAside>

      <TweetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        value={newTweet}
        onChange={setNewTweet}
        isPublishing={isPublishing}
        avatarUrl={user?.imageUrl}
        title="Criar Tweet"
      />
    </S.Container>
  );
};
