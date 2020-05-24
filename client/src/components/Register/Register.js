import React, { useState } from 'react';

import axios from 'axios';

const URL = "http://localhost:5000/";

const Register = () => {
    const [name, setName] = useState('');
    const [display, setDisplay] = useState('');
    const [room, setRoom] = useState('');
    const [nameTaken, setNameTaken] = useState('');

    const handleRegister = () => {
        let flag = true;
        axios.get(URL + 'users/name', { name: name })
        .then((res) => {
            console.log(res.data.message);
            if(res.data.message === "Name already exists") {
                setDisplay(res.message);
            }
            else {
                axios.post(URL + 'users', { name: name, password: room })
                .then((res) => {
                    console.log(res);
                    setDisplay('Account Created');
                    window.location = '/';
                });
            }
        });
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                {display}
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Password" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                </div>
                <button className={'button btn-blue mt-20'} onClick= {handleRegister}>Register</button>
            </div>
        </div>
    );
}

export default Register;