import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import firebaseConfig from '../config';
import 'firebase/auth';
console.log(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

const initialUser = {
  uid: null,
  displayName: null,
  loading: true,
  isAdmin: false,
};

// useContext
export const userContext = createContext({
  user: initialUser,
  auth: auth,
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
    const unsubscribe = auth.onAuthStateChanged(async (usr) => {
      if (usr && usr.emailVerified) {
        let isAdmin = false;
        await usr.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            isAdmin = true;
          }
        });
        setUser({
          uid: usr.uid,
          displayName: usr.displayName,
          loading: false,
          isAdmin: isAdmin,
        });
      } else {
        setUser({ ...initialUser, loading: false });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <userContext.Provider value={{ user, auth }}>
      {children}
    </userContext.Provider>
  );
};
export default UserContextProvider;
