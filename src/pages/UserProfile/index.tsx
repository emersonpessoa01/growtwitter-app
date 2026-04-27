import { useEffect, useState, useCallback } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styled, { keyframes } from "styled-components"; // Adicionado keyframes
import { api } from "../../services/api";
import { TweetCard } from "../../components/TweetCard";
import * as S from "../Profile/style";
import { Avatar } from "../../components/TweetCard/style";
import { FiArrowLeft } from "react-icons/fi";
import {
  SpinnerContainer,
  StyledSpinner,
} from "../../components/Spinner/style";
import { useAuth } from "../../contexts/AuthContext";
import { ButtonSpinner } from "./style";

export const UserProfile = () => {
  const { id } = useParams();
  const { user: me } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const initialUsername = location.state?.username;

  const [userData, setUserData] = useState<any>(null);
  const [userTweets, setUserTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tweets");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const userResponse = await api.get(`/users/${id}`);
      const data =
        userResponse.data.data || userResponse.data;
      setUserData(data);

      const following = data.followers?.some(
        (f: any) =>
          f.followerId === me?.id || f.id === me?.id,
      );
      setIsFollowing(!!following);

      if (activeTab === "tweets") {
        const tweetsRes = await api.get(
          `/users/${id}/tweets`,
        );
        setUserTweets(tweetsRes.data.data || []);
      } else if (activeTab === "likes") {
        const allRes = await api.get("/tweets");
        const liked = (allRes.data.data || []).filter(
          (t: any) =>
            t.likes?.some((l: any) => l.userId === id),
        );
        setUserTweets(liked);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, activeTab, me?.id]);

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSubmitting || !id) return;

    try {
      setIsSubmitting(true);
      if (isFollowing) {
        await api.delete("/followers", {
          data: { userId: id },
        });
      } else {
        await api.post("/followers", { userId: id });
      }
      setIsFollowing(!isFollowing);

      const refresh = await api.get(`/users/${id}`);
      setUserData(refresh.data.data || refresh.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <S.Container>
      <S.MainContent>
        <S.TopNav>
          <div
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft size={20} />
          </div>
          <div className="user-info">
            <h2>
              {userData?.name ||
                initialUsername ||
                "Perfil"}
            </h2>
            <span>{userTweets.length} Tweets</span>
          </div>
        </S.TopNav>

        {loading ? (
          <SpinnerContainer
            style={{ background: "transparent" }}
          >
            <StyledSpinner />
          </SpinnerContainer>
        ) : (
          <>
            <S.ProfileHeader>
              <div className="banner" />
              <div className="info">
                <div className="avatar-row">
                  <Avatar
                    src={
                      userData?.imageUrl ||
                      `https://ui-avatars.com/api/?name=${userData?.name}`
                    }
                    style={{
                      width: "133px",
                      height: "133px",
                      backgroundColor: "#fff",
                    }}
                  />

                  {id !== me?.id && (
                    <S.EditButton
                      onClick={handleFollow}
                      disabled={isSubmitting}
                      className={
                        isFollowing ? "following" : ""
                      }
                      style={{
                        backgroundColor: isFollowing
                          ? "#fff"
                          : "#1d9bf0",
                        color: isFollowing
                          ? "#0f1419"
                          : "#fff",
                        minWidth: "105px",
                        height: "36px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isSubmitting ? (
                        <ButtonSpinner
                          $isFollowing={isFollowing}
                        />
                      ) : isFollowing ? (
                        "Seguindo"
                      ) : (
                        "Seguir"
                      )}
                    </S.EditButton>
                  )}
                </div>

                <strong>{userData?.name}</strong>
                <span className="username">
                  @{userData?.username}
                </span>

                <S.StatsContainer>
                  <span>
                    <strong>
                      {userData?.followings?.length || 0}
                    </strong>{" "}
                    Seguindo
                  </span>
                  <span>
                    <strong>
                      {userData?.followers?.length || 0}
                    </strong>{" "}
                    Seguidores
                  </span>
                </S.StatsContainer>
              </div>
            </S.ProfileHeader>

            <S.TabsContainer>
              <div
                className={
                  activeTab === "tweets" ? "active" : ""
                }
                onClick={() => setActiveTab("tweets")}
              >
                Tweets
              </div>
              <div
                className={
                  activeTab === "replies" ? "active" : ""
                }
                onClick={() => setActiveTab("replies")}
              >
                Respostas
              </div>
              <div
                className={
                  activeTab === "likes" ? "active" : ""
                }
                onClick={() => setActiveTab("likes")}
              >
                Curtidas
              </div>
            </S.TabsContainer>

            <div>
              {userTweets.map((tweet: any) => (
                <TweetCard
                  key={tweet.id}
                  id={tweet.id}
                  name={userData?.name}
                  username={userData?.username}
                  content={tweet.content}
                  avatarUrl={userData?.imageUrl}
                  likes={tweet.likes?.length || 0}
                  isLiked={tweet.likes?.some(
                    (l: any) => l.userId === me?.id,
                  )}
                  isAuthor={tweet.authorId === me?.id}
                />
              ))}
            </div>
          </>
        )}
      </S.MainContent>
    </S.Container>
  );
};
