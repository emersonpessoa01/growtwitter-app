import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme.colors.backgroundColor};
`;

export const MainContent = styled.main`
    flex: 1;
    border-left: 1px solid ${(props) => props.theme.colors.border};
    border-right: 1px solid ${(props) => props.theme.colors.border};
    max-width: 600px;

`;

export const ProfileHeader = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};

    .banner{
        height:150px;
        background-color: ${(props) => props.theme.colors.secondary};
        margin: -1rem -1rem 0 -1rem;
    }
    .info{
        margin-top: -50px;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
`;

export const StatsContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: .5rem;

    span{
        font-size: .9rem;
        color: ${(props) => props.theme.colors.textColorSecondary};
        strong{
            color: ${(props) => props.theme.colors.textColor};
        }
    }
`;