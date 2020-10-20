import React from 'react';

export const Message = ({ message, id, author }) => {
  return (
    <div>
      <p>
        {id}, {message}, {author}
      </p>
    </div>
  );
};

export default Message;
