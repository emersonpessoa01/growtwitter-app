import React, {
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import * as S from "./style"; // Vamos criar o style.ts em seguida

// Definimos as propriedades que o botão aceita
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  ...rest
}) => {
  return (
    <S.StyledButton
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? (
        // Se estiver carregando, mostra o spinner centralizado
        <S.SpinnerWrapper>
          <S.ButtonSpinner />
        </S.SpinnerWrapper>
      ) : (
        // Se não, mostra o texto/conteúdo normal (o children)
        children
      )}
    </S.StyledButton>
  );
};
