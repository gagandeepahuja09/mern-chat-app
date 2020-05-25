import React, { useState, useEffect } from 'react';
import queryString from "query-string";

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
        const ans = users.map(user => <li onClick = { () => displayChat(user.name) }>{ user.name }</li>);
        return ans;
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
            <div>YOOO</div>
            <ul>
                { displayUsers() }
            </ul>
            </div>
        </div>
    );
}

export default Users;