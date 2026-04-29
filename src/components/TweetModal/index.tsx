import React from "react";
import * as S from "./style";
import * as HomeS from "../../pages/Home/style";
import { Avatar } from "../TweetCard/style";
import { Button } from "../Button";
import { useAuth } from "../../contexts/AuthContext";

interface TweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (value: string) => void;
  isPublishing: boolean;
  avatarUrl?: string;
  title?: string;
  buttonText?: string;
}

export const TweetModal: React.FC<TweetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  value,
  onChange,
  isPublishing,
  avatarUrl,
  title = "Tweet",
  buttonText = "Tweetar",
}) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalBox onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <button type="button" onClick={onClose}>
            &times;
          </button>
          <h2>{title}</h2>
        </S.ModalHeader>

        <HomeS.FormContainer onSubmit={onSubmit}>
          <Avatar
            src={
              avatarUrl ||
              (user?.name
                ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
                : "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png")
            }
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
              >
                {isPublishing ? "Enviando..." : buttonText}
              </Button>
            </div>
          </HomeS.FormContent>
        </HomeS.FormContainer>
      </S.ModalBox>
    </S.Overlay>
  );
};