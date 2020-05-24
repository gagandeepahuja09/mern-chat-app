import React, { useState } from 'react';

import axios from 'axios';

const URL = "http://localhost:5000/";

const Users = () => {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const { name } = queryString.parse(location.search);
        setName(name);
        axios.get(URL)
        .then(res => {
            setUsers(res.json());
        })
    }, [ENDPOINT, location.search]);

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                {display}
            </div>
        </div>
    );
}

export default Users;