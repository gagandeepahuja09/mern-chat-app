import React, { useState } from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message, typing, setTyping }) => {
    return (
        <div>
        <form className="form">
            <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyDown={ event => event.key !== 'Enter' ? setTyping({ typing: true }) : null }
            onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
        </form>
        </div>
    );
}

export default Input;