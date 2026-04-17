import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  SpinnerContainer,
  StyledSpinner,
} from "../components/Spinner/style";

export default function PrivateRoute() {
  const { signed, loading } = useAuth();
  if (loading) {
    return (
      <SpinnerContainer>
        <StyledSpinner />
      </SpinnerContainer>
    );
  }
  // Se estiver logado, renderiza o conteúdo da rota (Outlet)
  return signed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
