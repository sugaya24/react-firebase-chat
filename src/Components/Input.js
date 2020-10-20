import React, { useState } from 'react';
import { database } from '../App';
import * as firebase from 'firebase/app';

export default function Input() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    database.collection('messages').add({
      message,
      author: 'Yuki',
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    });
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>submit</button>
      </form>
      {/* <h1>{message}</h1> */}
    </div>
  );
}
