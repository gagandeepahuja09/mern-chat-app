import React, { useState, useEffect } from 'react';
import queryString from "query-string";
import io from "socket.io-client";


import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import './Chat.css'

let socket, timeout;

const Chat = ({ location }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [status, setStatus] = useState('');
    const [typing, setTyping] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState({});
    const [messages, setMessages] = useState([]);
    const [responses, setResponses] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        // Getting data from query parameters and setting them in variables
        const { from, to } = queryString.parse(window.location.search);

        // Setup the socket 
        socket = io(ENDPOINT, { withCredentials: false });

        setFrom(from);
        setTo(to);
        console.log("from and to", from, to);

        console.log(socket);
        // Emitting the name and room, so that it can be used in backend(on('join') in index.js)
        socket.emit('join', { from, to });

        // Get the messages which are already stored in db
        // socket.on(get_messages, )

    // only if these two values change, then only rerender it
    }, [ENDPOINT, window.location.search]);

    const timeoutFunction = () => {
        socket.emit("typing", false);
    }

    useEffect(() => {
        socket.emit('typing', from);
        clearTimeout(timeout)
        timeout = setTimeout(timeoutFunction, 2000)
    }, [typing]);

    useEffect(() => {
        socket.on('top-status', (status) => {
            setStatus(status);
        });
    }, [typing]);

    // for handling messages
    useEffect(() => {
        console.log('arr');
        // getting that message from backend using on at frontend and emit at backend
        // socket.on('message', ( message ) => {
            // since we cannot mutate the state
            const re = {
                from: from,
                to: to,
                text: message,
            };
            setResponse({ response: re });
            console.log('message sent');
        // });
    }, [message]);
    
    const updateRes = () => {
        socket.on('response', response => {
            // if(response.from.from != from) {
                // setMessages(messages => [ ...messages, message ]);
                setResponses([ ...responses, response ]);
            // }
        }) 
        console.log(responses);   
    };

    const sendMessage = (event) => {
        // Default behaviour would be to reset everything on 
        event.preventDefault();
        if(message) {
            // setMessages(messages => [ ...messages, message ]);
            // setResponses(responses => [ ...responses, response ]);
            socket.emit('sendMessage', response, () => setMessage(''), () => setResponse({}));
            updateRes();
        }
    }

    console.log(response, responses);

    return (
        <div className = "outerContainer">
            <div className = "container">
                <InfoBar to = { to } status = { status } />
                <Messages responses = { responses } name = { from } />
                <Input message = { message } setMessage = { setMessage } sendMessage = { sendMessage } typing = { typing } setTyping = { setTyping } />
            </div>
        </div>
    );
}

export default Chat;
