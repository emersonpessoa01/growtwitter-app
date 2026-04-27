import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalStyles from "./Global/syles";
import lightTheme from "./themes/index";
import { ThemeProvider } from "styled-components";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Explorer } from "./pages/Explorer";
import { UserProfile } from "./pages/UserProfile";
import { DefaultLayout } from "./layouts/DefaultLayout"; // Certifique-se de que o caminho está correto

export function App() {
  return (
    <ThemeProvider theme={lightTheme.light}>
      <GlobalStyles />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Rotas Protegidas com Layout Padronizado */}
          <Route element={<PrivateRoute />}>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<UserProfile />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}