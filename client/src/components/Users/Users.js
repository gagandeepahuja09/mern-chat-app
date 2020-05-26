import React, { useState, useEffect } from 'react';
import queryString from "query-string";

import './Users.css';

import axios from 'axios';

const Users = () => {
    const URL = "http://localhost:5000/";
    const fURL = "http://localhost:3000/";
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const { name } = queryString.parse(window.location.search);
        setName(name);
        axios.get(URL + 'users')
        .then(res => {
            setUsers(res.data);
        });
    }, [window.location.search, URL]);

    const displayChat = (other) => { 
        window.location.assign(`${fURL}chat/?from=${name}&to=${other}`);
    }

    const displayUsers = () => {
        const ans = users.map((user) => (
        <li
        class="w3-hover-red w3-padding-large"
        onClick = { () => displayChat(user.name) }>
            {user.name }
        </li>
        ));
        return ans;
    }

    return (
        <div>
        <h1>USERS</h1>
        <ul className="w3-ul w3-hoverable w3-xlarge w3-blue w3-center w3-card-4 wid">
                { displayUsers() }
        </ul>
        </div>
    );
}

export default Users;