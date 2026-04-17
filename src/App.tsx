import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalStyles from "./Global/syles";
import lightTheme from "./themes/index";
import { ThemeProvider } from "styled-components";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";

export function App() {
  return (
    //O ThemeProvider injeta as cores/fontes
    <ThemeProvider theme={lightTheme.dark}>
      <GlobalStyles />
      {/* O AuthProvider permite que as rotas saibam quem está logado*/}
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Rota Protegida */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            {/* Para adicionar as outras rotas (Perfil/Explorar) aqui dentro depois */}
          </Route>

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
