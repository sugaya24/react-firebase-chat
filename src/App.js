/** @jsx jsx */
import { useEffect, useContext, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Input from './Components/Input';
import Message from './Components/Message';
import Header from './Components/Header';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { userContext } from './contexts/userContext';
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';

export const database = firebase.firestore();

const style = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MessageWrapper = styled.div`
  width: 600px;
  flex: 1 1 100%;
  margin: 0 auto 40px;
  padding: 10px;
  overflow-y: scroll;
  border: 1px dotted black;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

const App = () => {
  const { user } = useContext(userContext);
  const messagesRef = database.collection('messages');
  const query = messagesRef.orderBy('createdAt');
  const [messages] = useCollectionData(query, { idField: 'id' });

  const dummy = useRef();

  const scrollToBottom = () => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div css={style} className="App">
      <Header />
      {user.uid ? (
        <MessageWrapper>
          {messages &&
            messages.map((m, id) => {
              const obj = {
                id,
                uid: m.uid,
                message: m.message,
                author: m.author,
                photoURL: m.photoURL,
              };
              return (
                <Message key={id} {...obj} scrollToBottom={scrollToBottom} />
              );
            })}
          <span ref={dummy}></span>
        </MessageWrapper>
      ) : (
        <MessageWrapper>
          <h2>Please use a Google account to log in to my apps. Thank you!</h2>
        </MessageWrapper>
      )}
      <Input scrollToBottom={scrollToBottom} />
    </div>
  );
};

export default App;
