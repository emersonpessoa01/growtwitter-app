import { useEffect, useState } from "react";

import {
  SpinnerContainer,
  StyledSpinner,
} from "../../components/Spinner/style";
import { useAuth } from "../../contexts/AuthContext";
// import { api } from "../../services/api";

export const Home = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  // const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        await new Promise((resolve) => {
          setTimeout(resolve, 1500);
        });

        // const response = await api.get("/tweets");
        // setTweets(response.data);
      } catch (error) {
        console.error(`Erro ao carregar o feed: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <SpinnerContainer>
        <StyledSpinner />
      </SpinnerContainer>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Bem-vindo ao Growtwitter, {user?.name}!</h2>
      <p>O feed carregou com sucesso.</p>
      <ul></ul>
    </div>
  );
};
