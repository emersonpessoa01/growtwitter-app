import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    91,
    112,
    131,
    0.4
  ); // Tom de cinza do Twitter/ Growtwitter
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  z-index: 10;
`;

export const ModalBox = styled.div`
    background-color: ${(props) => props.theme.colors.backgroundColor};
    width: 100%;
    max-width: 600px;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const ModalHeader = styled.header`
    padding: 10px 15px;
    display: flex;
    align-items: center;

    button{
      background-color:none;
      border:none;
      color: ${(props) => props.theme.colors.textColor};
      font-size: 20px;
      cursor: pointer;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover{
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    
`;