import React, { useState, useEffect } from 'react';
import queryString from "query-string";
import io from "socket.io-client";


import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import './Chat.css'

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        // Getting data from query parameters and setting them in variables
        const { name, room } = queryString.parse(location.search);

        // Setup the socket 
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        console.log(socket);
        // Emitting the name and room, so that it can be used in backend(on('join') in index.js)
        socket.emit('join', { name, room });

    // only if these two values change, then only rerender it
    }, [ENDPOINT, location.search]);


    // for handling messages
    useEffect(() => {
        // getting that message from backend using on at frontend and emit at backend
        socket.on('message', ( message ) => {
            // since we cannot mutate the state
            setMessages(messages => [ ...messages, message ]);
        });
    // we want to run this, only when messages array changes
    }, []);

    const sendMessage = (event) => {
        // Default behaviour would be to reset everything on 
        event.preventDefault();

        if(message) {
            setMessages(messages => [ ...messages, message ]);
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className = "outerContainer">
            <div className = "container">
                <InfoBar room = { room } />
                <Messages messages = { messages } name = { name } />
                <Input message = { message } setMessage = { setMessage } sendMessage = { sendMessage } />
            </div>
        </div>
    );
}

export default Chat;
