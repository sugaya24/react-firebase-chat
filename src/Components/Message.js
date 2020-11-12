/** @jsx jsx */
import { useContext, useEffect } from 'react';
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { userContext } from '../contexts/userContext';

const OtherUserMessage = styled.div`
  display: flex;
`;

const CurrentUserMessage = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UserInfo = styled.div`
  text-align: center;
  width: 100px;
  height: 100px;
`;

const UserIcon = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

const OtherUserText = styled.div`
  display: inline-block;
  position: relative;
  margin: auto 0 auto 15px;
  padding: 17px 13px;
  border-radius: 12px;
  background: #f0f0f0;
  height: fit-content;
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 18px;
    left: -24px;
    border: 12px solid transparent;
    border-right: 12px solid #f0f0f0;
  }
`;

const CurrentUserText = styled.div`
  display: inline-block;
  position: relative;
  margin: auto 15px auto 0;
  padding: 17px 13px;
  border-radius: 12px;
  background: #bbe2f1;
  height: fit-content;
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 18px;
    right: -24px;
    border: 12px solid transparent;
    border-left: 12px solid #bbe2f1;
  }
`;

export const Message = ({ message, uid, author, photoURL, scrollToBottom }) => {
  const { auth } = useContext(userContext);
  const isCurrentUserMessage = uid === auth.currentUser.uid;

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div>
      {isCurrentUserMessage ? (
        <CurrentUserMessage>
          <CurrentUserText>{message}</CurrentUserText>
          <UserInfo>
            <p>{author}</p>
            <UserIcon src={photoURL}></UserIcon>
          </UserInfo>
        </CurrentUserMessage>
      ) : (
        <OtherUserMessage>
          <UserInfo>
            <p>{author}</p>
            <UserIcon src={photoURL}></UserIcon>
          </UserInfo>
          <OtherUserText>{message}</OtherUserText>
        </OtherUserMessage>
      )}
    </div>
  );
};

export default Message;
