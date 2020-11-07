/** @jsx jsx */
import { useState, useEffect, useContext, useRef } from 'react';
import Input from './Components/Input';
import Message from './Components/Message';
import Header from './Components/Header';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { userContext } from './contexts/userContext';
import { jsx, css } from '@emotion/core';
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
  const [messages, setMessages] = useState([]);
  const { user } = useContext(userContext);

  const dummy = useRef();

  useEffect(() => {
    database
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot((snap) => {
        setMessages([]);
        snap.forEach((doc) => {
          const data = doc.data();
          const message = {
            uid: data.uid || '',
            id: doc.id || '',
            message: data.message || '',
            author: data.author || '',
            photoURL: data.photoURL || '',
            createdAt: (data.createdAt && data.createdAt.seconds * 1000) || '',
          };
          setMessages((prev) => [...prev, message]);
        });
      });
  }, []);

  if (dummy.current) {
    dummy.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  return (
    <div css={style} className="App">
      <Header />
      {user.uid ? (
        <MessageWrapper>
          {messages.map((m, id) => {
            const obj = {
              id,
              uid: m.uid,
              message: m.message,
              author: m.author,
              photoURL: m.photoURL,
            };
            return <Message key={id} {...obj} />;
          })}
          <span ref={dummy}></span>
        </MessageWrapper>
      ) : (
        <MessageWrapper>
          <h2>You must Login to post and see messages.</h2>
        </MessageWrapper>
      )}
      <Input />
    </div>
  );
};

export default App;
