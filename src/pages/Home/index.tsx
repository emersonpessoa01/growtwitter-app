import { useState } from "react";
import { RiHome7Fill } from "react-icons/ri";
import { BsHash, BsPerson } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";
import * as S from "./style";
import logo from "../../assets/logo_growtweet.svg";

export const Home = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");

  return (
    <S.Container>
      <S.SideBar>
        <div>
          <div className="logo">
            <img src={logo} alt="growtweet" />
          </div>
          <S.NavMenu>
            <ul>
              <li className="active"><RiHome7Fill size={24} /> Página Inicial</li>
              <li><BsHash size={24} /> Explorar</li>
              <li><BsPerson size={24} /> Perfil</li>
            </ul>
          </S.NavMenu>
          <Button widht="100%" marginTop="1rem">Tweetar</Button>
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
            active={activeTab === "forYou"} 
            onClick={() => setActiveTab("forYou")}
          >
            Para você
          </S.Tab>
          <S.Tab 
            active={activeTab === "following"} 
            onClick={() => setActiveTab("following")}
          >
            Seguindo
          </S.Tab>
        </S.TabsContainer>

        <S.FeedSection>
          {activeTab === "forYou" ? (
            <p>Mostrando tweets globais...</p>
          ) : (
            <p>Mostrando tweets de quem você segue...</p>
          )}
        </S.FeedSection>
      </S.MainContent>

      <S.WidgetsAside>
         {/* Conteúdo "O que está acontecendo" virá aqui */}
      </S.WidgetsAside>
    </S.Container>
  );
};