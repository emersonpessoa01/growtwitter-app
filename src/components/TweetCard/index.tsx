import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineDelete,
} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import * as S from "./style";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  isAuthor?: boolean;
  isReply?: boolean;
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
}) => {
  const publishedDate = date
    ? format(
        new Date(date),
        "d 'de' MMM., HH:mm",
        {
          locale: ptBR,
        },
      )
    : "";
  return (
    <S.CardContainer $isReply={isReply} id={`tweet-${id}`}>
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
          {content}
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
              <S.DeleteIcon
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
              >
                <AiOutlineDelete />
              </S.DeleteIcon>
            )}
          </S.Actions>
        )}
      </S.ContentWrapper>
    </S.CardContainer>
  );
};
