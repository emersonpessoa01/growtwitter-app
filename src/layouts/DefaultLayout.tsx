import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import * as S from "../pages/Home/style";
import { SideBarHeader, ToggleTheme } from "./style";
import { WhoToFollow } from "../components/WhoToFollow";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
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

import logo from "../assets/images/logo.png";
import circle from "../assets/images/favicon_circle.png";
import { BoxImage } from "./style";

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

  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth <= 768,
  );
  /* Para redimensionamento do sidebar */
  useEffect(() => {
    const handleResize = () =>
      setIsSmallScreen(window.innerWidth <= 800);
    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTweet.trim()) return;

    try {
      setIsPublishing(true);
      await api.post("/tweets", {
        content: newTweet,
      });
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
          <SideBarHeader onClick={() => navigate("/home")}>
            <BoxImage
              className="logo"
              style={{
                cursor: "pointer",
                padding: "10px 0",
              }}
            >
              {/* Aumentado para 130px para ficar proporcional aos ícones */}
              <img
                src={isSmallScreen ? circle : logo}
                alt="growtweet"
                className="logo-img"
              />
            </BoxImage>

            {/* Toggle de tema estilizado */}
            <ToggleTheme onClick={toggleTheme}>
              {isDarkMode ? (
                <BsSun
                  size={24}
                  color="#ebf706"
                  style={{ marginRight: "0.5rem" }}
                />
              ) : (
                <BsMoonStars size={24} color="#4f4f4f" />
              )}
            </ToggleTheme>
          </SideBarHeader>

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
