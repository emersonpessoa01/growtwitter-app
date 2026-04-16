import React, {
  createContext,
  useState,
  useEffect,
  useContext,
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
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Ao carregar o app, verifica se já existe um usuário salvo no navegador [cite: 28]
    const storagedUser = localStorage.getItem(
      "@Growtwitter:user",
    );
    const storagedToken = localStorage.getItem(
      "@Growtwitter:token",
    );

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function signIn(credentials: object) {
    const response = await api.post("/login", credentials); // Rota de login da API [cite: 26]

    const { user, token } = response.data.data;

    setUser(user);
    api.defaults.headers.Authorization = `Bearer ${token}`;

    localStorage.setItem(
      "@Growtwitter:user",
      JSON.stringify(user),
    );
    localStorage.setItem("@Growtwitter:token", token);
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
