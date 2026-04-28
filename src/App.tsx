import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalStyles from "./Global/syles";
import themes from "./themes/index";

import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Explorer } from "./pages/Explorer";
import { UserProfile } from "./pages/UserProfile";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes>
          {/* Passando o toggleTheme para o Login e o Signup */}
          <Route path="/login" element={<Login toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoute />}>
            <Route element={<DefaultLayout toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}>
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