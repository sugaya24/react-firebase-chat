import React, { useContext } from 'react';
import firebase from 'firebase/app';
import { userContext } from '../contexts/userContext';
import srcLogo from '../images/logo.png';
import styled from '@emotion/styled';

export const Header = ({ messages }) => {
  const Container = styled.div`
    width: 960px;
    height: 80px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    @media (max-width: 960px) {
      width: 600px;
    }
    @media (max-width: 720px) {
      width: 100%;
    }
  `;

  const Logo = styled.div`
    width: 200px;
    height: 100%;
    background-image: url(${srcLogo});
    background-repeat: no-repeat;
  `;

  const ButtonWrapper = styled.div`
    display: flex;
    /* width: 200px; */
    margin-right: 10px;
    align-items: center;
    /* justify-content: center; */
  `;

  const LoginButton = styled.button`
    width: 100px;
    height: 30px;
    border: solid 1px #333;
    background: #fff;
    border-radius: 2px;
    cursor: pointer;
  `;

  const { auth } = useContext(userContext);

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const isLoggedIn = auth.currentUser;

  return (
    <div>
      <Container>
        <Logo></Logo>
        <ButtonWrapper>
          {isLoggedIn ? (
            <LoginButton onClick={handleLogout}>Logout</LoginButton>
          ) : (
            <LoginButton onClick={handleLogin}>Login</LoginButton>
          )}
        </ButtonWrapper>
      </Container>
    </div>
  );
};

export default Header;
