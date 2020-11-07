/** @jsx jsx */
import { useState, useContext } from 'react';
import { database } from '../App';
import * as firebase from 'firebase/app';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { userContext } from '../contexts/userContext';

const InputWrap = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

const inputStyle = css`
  height: 24px;
  width: 600px;
  &:focus {
    outline: none;
  }

  @media (max-width: 720px) {
    width: 240px;
  }
`;

const SubmitButton = styled.button`
  border: solid 1px #000;
  border-radius: 2px;
  height: 30px;
  padding: 0 16px;
  margin-left: 8px;
  background-color: #fff;
`;

export const Input = () => {
  const { auth, user } = useContext(userContext);
  const { photoURL } = auth.currentUser ? auth.currentUser : '';
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    database.collection('messages').add({
      uid: user.uid,
      message,
      author: user.displayName,
      photoURL,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    });
    setMessage('');
  };

  const validateInput = () => {
    if (user.uid) return false;
    return true;
  };

  const validateSubmit = () => {
    if (message) return false;
    return true;
  };

  return (
    <div>
      <InputWrap>
        <form onSubmit={handleSubmit}>
          <input
            disabled={validateInput()}
            css={inputStyle}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SubmitButton disabled={validateSubmit()}>submit</SubmitButton>
        </form>
      </InputWrap>
    </div>
  );
};

export default Input;
