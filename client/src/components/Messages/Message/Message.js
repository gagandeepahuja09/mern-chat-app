
import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ response, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  const text = response.response.text;
  const from = response.response.from;
  const to = response.response.to;
  console.log(text, to, from);

  if(from === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
          </div>
        )
  );
}

export default Message;