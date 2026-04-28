import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import { api } from "../services/api";

// Definindo a estrutura do usuário baseada na API do Growtwitter
interface User {
  id: string;
  name: string;
  username: string;
  imageUrl?: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(credentials: object): Promise<void>;
  signOut(): void;
  updateUser(newUser: User): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadingStorageData() {
      // Função que ao carregar o app, verifica se já existe um usuário salvo no navegador
      const storagedUser = localStorage.getItem(
        "@Growtwitter:user",
      );
      const storagedToken = localStorage.getItem(
        "@Growtwitter:token",
      );

      // Executa a leitura e o delay em paralelo

      if (storagedUser && storagedToken) {
        try {
          if (
            storagedUser !== "undefined" &&
            storagedToken !== "undefined"
          ) {
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
            setUser(JSON.parse(storagedUser));
          }
        } catch (error) {
          console.error(
            `Erro no parse do storage: ${error}`,
          );
          localStorage.clear();
        }
      }
      setLoading(false);
    }
    loadingStorageData();
  }, []);

  async function signIn(credentials: object) {
    try {
      const response = await api.post(
        "/auth/login",
        credentials,
      );
      console.log("RES LOGIN:", response.data);

      // Para bater com o retorno da API, verifica se o status é 200
      if (response.status !== 200) {
        throw new Error("Falha na autenticação");
      }
      const { authUser, authToken } = response.data.data;
      console.log(authUser, authToken);

      setUser(authUser);
      api.defaults.headers.Authorization = `Bearer ${authToken}`;

      localStorage.setItem(
        "@Growtwitter:user",
        JSON.stringify(authUser),
      );
      localStorage.setItem("@Growtwitter:token", authToken);
    } catch (error) {
      console.error(`Erro no login: ${error}`);
      throw error; // Re-throw para que a UI possa lidar com isso (exibir mensagem de erro, etc.)
    }
  }

  function updateUser(newUser: User) {
    // Atualiza o estado (faz o Sidebar e Profile mudarem na hora)
    setUser(newUser);

    // Atualiza o Storage (para quando der F5 continuar com os dados novos)
    localStorage.setItem(
      "@Growtwitter:user",
      JSON.stringify(newUser),
    );
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
