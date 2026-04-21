// src/components/TweetModal/index.tsx
import React from "react";
import * as S from "./style";
import * as HomeS from "../../pages/Home/style"; // Reaproveitamos os estilos do form
import { Button } from "../Button";
import { useAuth } from "../../contexts/AuthContext";

interface TweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (value: string) => void;
  isPublishing: boolean;
}

export const TweetModal: React.FC<TweetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  value,
  onChange,
  isPublishing,
}) => {
  if (!isOpen) return null;

  const { user } = useAuth();

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalBox onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <button type="button" onClick={onClose}>&times;</button>
        </S.ModalHeader>

        {/* Aqui usamos os mesmos estilos que você já tinha na Home */}
        <HomeS.FormContainer onSubmit={(e) => {
          onSubmit(e);
          onClose(); // Fecha o modal após enviar
        }}>
          <HomeS.AvatarImg
            src={user?.imageUrl || "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"}
            alt={user?.name}
          />
          <HomeS.FormContent>
            <textarea
              placeholder="O que está pensando?"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={5}
              autoFocus
            />
            <div className="form-actions">
              <Button
                type="submit"
                $width="100px"
                $marginTop="0"
                disabled={!value.trim() || isPublishing}
                loading={isPublishing}
              >
                Tweetar
              </Button>
            </div>
          </HomeS.FormContent>
        </HomeS.FormContainer>
      </S.ModalBox>
    </S.Overlay>
  );
};