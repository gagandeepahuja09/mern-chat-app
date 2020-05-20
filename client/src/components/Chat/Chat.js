import React, { useState, useEffect } from 'react';
import queryString from "query-string";
import io from "socket.io-client";

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
        socket.on('message', );
    });
    return (
        <h1>Chat</h1>
    );
}

export default Chat;
