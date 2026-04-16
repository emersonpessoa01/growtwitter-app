import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import { api } from "../services/api";

// Defina a estrutura do usuário baseada na API do Growtwitter [cite: 30]
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
      // Cria uma promessa de 800ms
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

      // Ao carregar o app, verifica se já existe um usuário salvo no navegador [cite: 28]
      const storagedUser = localStorage.getItem(
        "@Growtwitter:user",
      );
      const storagedToken = localStorage.getItem(
        "@Growtwitter:token",
      );

      // Executa a leitura e o dealy em paralelo
      await delay(2000);

      if (
        storagedUser &&
        storagedToken !== "undefined" &&
        storagedToken
      ) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
      setLoading(false);
    }
    loadingStorageData();
  }, []);

  async function signIn(credentials: object) {
    const response = await api.post(
      "/auth/login",
      credentials,
    );

    // Ajuste aqui para bater com o retorno da sua API (visto no seu log)
    const { authUser, authToken } = response.data.data;

    setUser(authUser);
    api.defaults.headers.Authorization = `Bearer ${authToken}`;

    localStorage.setItem(
      "@Growtwitter:user",
      JSON.stringify(authUser),
    );
    localStorage.setItem("@Growtwitter:token", authToken);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
