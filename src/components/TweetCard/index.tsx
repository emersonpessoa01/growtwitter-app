import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import * as S from "./style";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatCodeText } from "../../utils/formatters";

interface TweetCardProps {
  id: string;
  name: string;
  username: string;
  content: string;
  date: string;
  avatarUrl?: string;
  likes: number;
  comments?: number;
  isLiked?: boolean;
  onLike?: () => void;
  onReply?: () => void;
  onDelete?: () => void;
  onProfileClick?: () => void;
  isAuthor?: boolean;
  isReply?: boolean;
  onEdit?: () => void;
  replies?: any[];
}

export const TweetCard: React.FC<TweetCardProps> = ({
  id,
  name,
  username,
  content,
  date,
  avatarUrl,
  likes,
  comments = 0,
  isLiked = false,
  onLike,
  onReply,
  onDelete,
  isAuthor = false,
  isReply = false,
  onProfileClick,
  onEdit,
}) => {

  
  const publishedDate = date
    ? format(new Date(date), "d 'de' MMM., HH:mm", {
        locale: ptBR,
      })
    : "";
  return (
    <S.CardContainer
      $isReply={isReply}
      id={`tweet-${id}`}
      onClick={onProfileClick}
    >
      <S.Avatar
        $isReply={isReply}
        src={
          avatarUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        }
      />

      <S.ContentWrapper>
        <S.TweetHeader>
          <S.NameContainer>
            <strong>{name}</strong>
            <span>@{username}</span>
            <span className="dot">·</span>
            <span className="date">{publishedDate}</span>
          </S.NameContainer>
        </S.TweetHeader>

        <S.TweetText $isReply={isReply}>
          {formatCodeText(content)}
        </S.TweetText>

        {/* As ações só aparecem no tweet principal */}
        {!isReply && (
          <S.Actions>
            <S.ActionItem
              $variant="comment"
              onClick={(e) => {
                e.stopPropagation();
                onReply?.();
              }}
            >
              <FaRegComment />
              {comments}
            </S.ActionItem>
            <S.ActionItem
              $variant="like"
              $active={isLiked}
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
            >
              {isLiked ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )}
              {likes}
            </S.ActionItem>
            {/* A lixeira entra aqui: ao lado dos ícones, apenas se for autor e NÃO for reply */}
            {isAuthor && (
              <S.AuthorAcions>
                <S.DeleteIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(); // Abre o modal ou ativa o input de edição
                  }}
                >
                  <AiOutlineEdit />
                </S.DeleteIcon>

                <S.DeleteIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                  }}
                >
                  <AiOutlineDelete />
                </S.DeleteIcon>
              </S.AuthorAcions>
            )}
          </S.Actions>
        )}
      </S.ContentWrapper>
    </S.CardContainer>
  );
};
