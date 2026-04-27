import { Outlet } from "react-router-dom";
import * as S from "../pages/Home/style"; 
import { WhoToFollow } from "../components/WhoToFollow";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/images/logo_growtweet.svg";
import { RiHome7Fill } from "react-icons/ri";
import { BsHash, BsPerson } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/Button";
import { Avatar } from "../components/TweetCard/style";

export const DefaultLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <S.Container>
      <S.SideBar>
        <div>
          <div className="logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="growtweet" />
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
          <Button $width="100%" $marginTop="1rem" onClick={() => navigate("/")}>
            Tweetar
          </Button>
        </div>

        <S.UserInfo onClick={signOut} style={{ cursor: "pointer" }}>
          <Avatar
            src={user?.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random`}
            alt={user?.name}
          />
          <S.NameContainer>
            <strong>{user?.name || "User"}</strong>
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
    </S.Container>
  );
};