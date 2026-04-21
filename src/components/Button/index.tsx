import React, {
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import * as S from "./style"; // Vamos criar o style.ts em seguida

// Definimos as propriedades que o botão aceita
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  $width?: string;
  $marginTop?: string;
  $active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  $width,
  $marginTop,
  $active,
 
  ...rest
}) => {
  return (
    <S.StyledButton
      
      $width={$width}
      $marginTop={$marginTop}
      $active={$active}
      $loading={loading}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? (
        <S.SpinnerWrapper>
          <S.ButtonSpinner />
        </S.SpinnerWrapper>
      ) : (
        children
      )}
    </S.StyledButton>
  );
};
