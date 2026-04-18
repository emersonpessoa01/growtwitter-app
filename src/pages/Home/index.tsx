import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ButtonSpinner } from "../../components/Button/style"; // Podemos usar o spinner do botão aqui

export const Home = () => {
  const { user } = useAuth();
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function fetchTweets() {
      try {
        // Agora o carregamento acontece em segundo plano
        // const response = await api.get("/tweets");
        // setTweets(response.data.data);
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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Menu Lateral (Exemplo simples) */}
      <aside style={{ width: '250px', borderRight: '1px solid #eee', padding: '1rem' }}>
        <h2>Growtwitter</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Página Inicial</li>
            <li style={{ marginBottom: '1rem' }}>Explorar</li>
            <li style={{ marginBottom: '1rem' }}>Perfil</li>
          </ul>
        </nav>
      </aside>

      {/* Área Central do Feed */}
      <main style={{ flex: 1, padding: '1rem' }}>
        <header style={{ borderBottom: '1px solid #eee', marginBottom: '1rem' }}>
          <h3>Página Inicial</h3>
        </header>

        <section>
           {/* Se estiver carregando os tweets, mostra o spinner só aqui no meio */}
           {loadingFeed ? (
             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <ButtonSpinner style={{ borderTopColor: '#1DA1F2', borderLeftColor: '#eee' }} />
                <p style={{ marginLeft: '10px' }}>Buscando tweets...</p>
             </div>
           ) : (
             <div>
               <p>Olá, {user?.name}! O que está acontecendo?</p>
               {/* Aqui virá o seu .map(tweet => ...) */}
               {tweets.length === 0 && <p style={{ color: '#666' }}>Nenhum tweet por aqui ainda.</p>}
             </div>
           )}
        </section>
      </main>
    </div>
  );
};