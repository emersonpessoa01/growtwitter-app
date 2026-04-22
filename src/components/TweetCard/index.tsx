import {
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import * as S from "./style";

interface TweetCardProps {
  name: string;
  username: string;
  content: string;
  avatarUrl?: string;
  likes: number;
  comments?: number;
  isLiked?: boolean;
}

export const TweetCard: React.FC<TweetCardProps> = ({
  name,
  username,
  content,
  avatarUrl,
  likes,
  comments = 0,
  isLiked = false,
}) => {
  return (
    <S.CardContainer>
      <S.Avatar
        src={
          avatarUrl
            ? avatarUrl
            : name
              ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&border=2px%20solid%20${encodeURIComponent("#" + Math.floor(Math.random() * 16777215).toString(16))}`
              : "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
        }
      />

      <S.ContentWrapper>
        <S.TweetHeader>
          <strong>{name}</strong>
          <span>@{username}</span>
        </S.TweetHeader>

        <S.TweetText>{content}</S.TweetText>
        <S.Actions>
          <S.ActionItem $variant="comment">
            <FaRegComment />
            {comments}
          </S.ActionItem>

          <S.ActionItem $variant="like" $active={isLiked}>
            {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            {likes}
          </S.ActionItem>
        </S.Actions>
      </S.ContentWrapper>
    </S.CardContainer>
  );
};
