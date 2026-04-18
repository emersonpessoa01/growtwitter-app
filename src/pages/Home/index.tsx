import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ButtonSpinner } from "../../components/Button/style";
import * as S from "./style";

export const Home = () => {
  const { user } = useAuth();
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function fetchTweets() {
      try {
        setLoadingFeed(true);
        // Agora o carregamento acontece em segundo plano
        // const response = await api.get("/tweets");
        // setTweets(response.data.data);

        // Adicionado este delay artificial de 2s para testar o spinner
        await new Promise((resolve) =>
          setTimeout(resolve, 2000),
        );
      } catch (error) {
        console.error("Erro ao carregar feed:", error);
      } finally {
        // Mesmo que demore ou dê erro, paramos o loading para liberar a tela
        setLoadingFeed(false);
      }
    }
    fetchTweets();
  }, []);

  return (
    <S.Container>
      {/* Menu Lateral (Exemplo simples) */}
      <S.Sidebar>
        <h2>Growtwitter</h2>
        <nav>
          <ul>
            <li>Página Inicial</li>
            <li>Explorar</li>
            <li>Perfil</li>
          </ul>
        </nav>
      </S.Sidebar>

      {/* Área Central do Feed */}
      <S.MainContent>
        <S.Header>
          <h3>Página Inicial</h3>
        </S.Header>

        <S.FeedSection>
          {/* Se estiver carregando os tweets, mostra o spinner só aqui no meio */}
          {loadingFeed ? (
            <S.LoadingContainer>
              <S.ButtonSpinner
                size="2.5rem"
                borderTopColor="#1DA1F2"
                borderLeftColor="#adc8d2"
              />
              <p>Buscando tweets...</p>
            </S.LoadingContainer>
          ) : (
            <div>
              <p>
                Olá, {user?.name}! O que está acontecendo?
              </p>
              {/* Aqui virá o seu .map(tweet => ...) */}
              {tweets.length === 0 && (
                <p style={{ color: "#666" }}>
                  Nenhum tweet por aqui ainda.
                </p>
              )}
            </div>
          )}
        </S.FeedSection>
      </S.MainContent>
    </S.Container>
  );
};
