import React, { useState, useEffect } from 'react';
import Input from './Components/Input';
import Message from './Components/Message';
import firebase from 'firebase/app';
import firebaseConfig from './config';
import 'firebase/auth';
import './App.css';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const database = firebase.firestore();
const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    database
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot((snap) => {
        setMessages([]);
        snap.forEach((doc) => {
          const data = doc.data();
          const message = {
            id: doc.id || '',
            message: data.message || '',
            author: data.author || '',
            createdAt: (data.createdAt && data.createdAt.seconds * 1000) || '',
          };
          console.log(message);
          setMessages((prev) => [...prev, message]);
          // setMessages(messages);
        });
      });
  }, []);

  // const handleMessage = (text) => {
  //   setMessages([...messages, { message: text, author: 'Yuki' }]);
  // };

  console.log('messages', messages);

  return (
    <div className="App">
      {/* <header className="App-header">Chat App</header> */}
      <Input />
      {messages.map((m, id) => {
        const obj = {
          id,
          message: m.message,
          author: m.author,
        };
        return <Message key={id} {...obj} />;
      })}
    </div>
  );
};

export default App;
